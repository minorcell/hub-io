import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";

export const getLogoDataUrl = cache(async (): Promise<string> => {
  const file = await readFile(join(process.cwd(), "public/io-logo.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
});
