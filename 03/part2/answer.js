import { readFile } from "node:fs/promises";

import chunk from "lodash/chunk.js";
import intersection from "lodash/intersection.js";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  const lines = fileContent.split("\n");
  return (
    // group ruckssacks in groups of 3
    chunk(
      lines.map((rucksack) => rucksack.split("")),
      3
    )
      // get chars occuring in all 3 rucksacks
      .flatMap((rucksacks) => intersection(...rucksacks))
      .map((item) => {
        const code = item.charCodeAt(0);
        if (code < "a".charCodeAt(0)) {
          // is upper case
          return code - 38;
        }
        // is lower case
        return code - 96;
      })
      .reduce((sum, item) => sum + item, 0)
  );
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
