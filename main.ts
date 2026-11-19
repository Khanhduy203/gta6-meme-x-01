/**
 * gta6-meme-x-01 entrypoint.
 *
 * Copies POST.json (the address of the X post carrying the meme) from the
 * repository directory into the output directory, byte for byte. Nothing
 * else: the house reads the post itself from X.
 */

import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const REPO_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const POST_FILE = "POST.json";

async function main(): Promise<void> {
  const source = join(REPO_DIR, POST_FILE);
  const target = join(OUT_DIR, POST_FILE);
  try {
    await mkdir(OUT_DIR, { recursive: true });
    await copyFile(source, target);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(`failed to copy ${source} to ${target}: ${reason}`);
    process.exit(1);
  }
}

await main();
