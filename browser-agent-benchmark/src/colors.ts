// Minimal ANSI color helpers. Disabled when not a TTY or when NO_COLOR is set
// (https://no-color.org), so piping logs to a file stays clean.
const enabled = process.stdout.isTTY && !process.env.NO_COLOR;

const wrap = (code: number) => (s: string | number) => (enabled ? `\x1b[${code}m${s}\x1b[0m` : String(s));

export const c = {
  bold: wrap(1),
  dim: wrap(2),
  red: wrap(31),
  green: wrap(32),
  yellow: wrap(33),
  blue: wrap(34),
  magenta: wrap(35),
  cyan: wrap(36),
};
