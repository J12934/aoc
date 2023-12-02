import { readFile } from "node:fs/promises";

import chunk from "lodash/chunk.js";
import intersection from "lodash/intersection.js";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  return fileContent
    .split("\n")
    .map((rucksack) => rucksack.split(""))
    .map((rucksack) => chunk(rucksack, rucksack.length / 2))
    .flatMap((compartments) => intersection(...compartments))
    .map((item) => {
      const code = item.charCodeAt(0);
      if (code < "a".charCodeAt(0)) {
        // is upper case
        return code - 38;
      }
      // is lower case
      return code - 96;
    })
    .reduce((sum, item) => sum + item, 0);
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
