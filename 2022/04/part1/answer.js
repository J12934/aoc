import { readFile } from "node:fs/promises";

import intersection from "lodash/intersection.js";
import isEqual from "lodash/isEqual.js";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  return fileContent
    .split("\n")
    .filter(Boolean)
    .map((line) =>
      line
        .split(",")
        .map((assignment) => assignment.split("-"))
        .map(([start, finish]) => [parseInt(start, 10), parseInt(finish, 10)])
    )
    .map(([[start1, finish1], [start2, finish2]]) => {
      return [
        Array.from({ length: finish1 - start1 + 1 }, (e, i) => i + start1),
        Array.from({ length: finish2 - start2 + 1 }, (e, i) => i + start2),
      ];
    })
    .map(([assignment1, assignment2]) => {
      const commonTasks = intersection(assignment1, assignment2);
      return (
        isEqual(commonTasks, assignment1) || isEqual(commonTasks, assignment2)
      );
    })
    .filter(Boolean).length;
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
