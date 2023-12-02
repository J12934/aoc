import { readFile } from "node:fs/promises";

const UNIQ_CHARS_FOR_MARKER = 14;
/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  for (let i = 0; i < fileContent.length - UNIQ_CHARS_FOR_MARKER - 1; i++) {
    const letters = new Set();

    for (let j = 0; j < UNIQ_CHARS_FOR_MARKER; j++) {
      letters.add(fileContent.charAt(i + j));
    }

    if (letters.size === UNIQ_CHARS_FOR_MARKER) {
      return i + UNIQ_CHARS_FOR_MARKER;
    }
  }
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
