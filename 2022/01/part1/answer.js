import { readFile } from "node:fs/promises";
import max from "lodash/max.js";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  return max(
    fileContent
      .split("\n\n")
      .map((group) => group.split("\n"))
      .map((group) => group.map((numAsString) => parseInt(numAsString, 10)))
      .map((group) => group.reduce((sum, calory) => sum + calory, 0))
  );
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
