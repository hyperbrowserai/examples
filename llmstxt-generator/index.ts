import inquirer from "inquirer";
import ora from "ora";
import fs from "fs";
import path from "path";
import { Hyperbrowser } from "@hyperbrowser/sdk";
import OpenAI from "openai";
import { SingleBar, Presets } from "cli-progress";

// ----------------------------TYPES---------------------------
interface Options {
  url: string;
  maxUrls: number;
  outputDir: string;
}

interface CrawlResult {
  url: string;
  markdown: string | undefined;
}
// -------------------------------------------------------------

const browser = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});

const ai = new OpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1",
  apiKey: process.env.OPENAI_API_KEY!,
});

// Summarize one page with OpenAI
async function summarizePage(markdown: string, url: string): Promise<string> {
  if (!markdown) return "No description available.";

  const prompt = `
    You are generating entries for an llms.txt file.

    Rules:
    - Output MUST be in the format:
    - [Title](URL): Short description (max 12 words).
    - Title: 3–5 words only, no "Short Title", no placeholders.
    - Description: concise, human-readable, no extra punctuation.
    - Do not use bold, quotes, or headings.

    Examples:
    - [Web Data Extraction](https://firecrawl.dev): Transform websites into clean, LLM-ready data.
    - [Scaling Web Apps](https://example.com/blog): Compare SSR, CSR, and rendering approaches.

    Now generate entry for this page:
    URL: ${url}
    Content:
    ${markdown.slice(0, 2000)}
`;

  const res = await ai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return res.choices[0]?.message.content?.trim() || "Summary unavailable.";
}

export async function generateLLMSTxt(
  crawlData: Omit<CrawlResult, "html">[],
  siteName: string,
  outputDir: string
) {
  if (!crawlData || crawlData.length === 0) {
    console.error("⚠️ No crawl data to process.");
    return;
  }

  let content = `# https://${siteName} llms.txt\n\n`;

  // 🔥 Progress bar
  const bar = new SingleBar(
    {
      format: "Summarizing |{bar}| {percentage}% || {value}/{total} Pages",
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
    },
    Presets.shades_classic
  );

  bar.start(crawlData.length, 0);

  for (const page of crawlData) {
    if (!page?.url) {
      console.warn(`⚠️ Skipping page, missing URL.`);
      bar.increment();
      continue;
    }

    try {
      const summary = await summarizePage(page.markdown || "", page.url);

      // Split into lines, remove empties
      const lines = summary.split("\n").filter((l) => l.trim());
      for (const line of lines) {
        let clean = line.trim();

        if (!clean.startsWith("- ")) {
          clean = `- ${clean}`;
        }

        content += `${clean}\n`;
      }
    } catch (err) {
      console.error(`❌ Failed to summarize ${page.url}:`, err);
    }

    bar.increment();
  }

  bar.stop();
  console.log("✅ All summaries generated.");

  fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, "llms.txt");
  fs.writeFileSync(filePath, content, "utf-8");

  console.log(`📄 llms.txt written to ${filePath}`);
}

async function crawl(url: string, maxPages: number) {
  const spinner = ora("Crawling website...").start();

  try {
    const res = await browser.crawl.startAndWait(
      {
        url,
        maxPages,
      },
      true
    );

    spinner.succeed("🌍 Crawl completed.");

    if (res.error) {
      console.error(res.error);
      return [];
    }

    let content = "";
    const crawlData = res.data?.map((val) => {
      console.log("🔗 URL Found:", val.url);
      content += `${val.url} \n`;
      return { url: val.url, markdown: val.markdown };
    });

    fs.writeFileSync("crawl-urls.txt", content, "utf-8");

    return crawlData || [];
  } catch (err) {
    spinner.fail("❌ Crawl failed.");
    console.error(err);
    return [];
  }
}

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the start URL:",
      validate: (val: string) =>
        val.startsWith("http")
          ? true
          : "Please enter a valid URL (http/https).",
    },
    {
      type: "number",
      name: "maxUrls",
      message: "Max number of pages to crawl:",
      default: 50,
    },
    {
      type: "input",
      name: "outputDir",
      message: "Output directory:",
      default: "output",
    },
  ]);

  const options: Options = {
    url: answers.url,
    maxUrls: answers.maxUrls,
    outputDir: answers.outputDir,
  };

  const crawlData = await crawl(options.url, options.maxUrls);

  if (!crawlData || crawlData.length === 0) {
    console.error("❌ No crawl data found, exiting...");
    return;
  }

  await generateLLMSTxt(
    crawlData,
    new URL(options.url).hostname,
    options.outputDir
  );
}
main();
