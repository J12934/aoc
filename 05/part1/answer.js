import { readFile } from "node:fs/promises";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  const [stackSection, moveLines] = fileContent.split("\n\n");
  const stackLines = stackSection.split("\n");

  const grid = stackLines
    .filter(Boolean)
    .map((line) => line.replaceAll("    ", " "))
    .map((line) => line.replaceAll(/[\d,\[,\]]/g, ""))
    .map((line) => line.split(" "))
    .reduce((stacks, line) => {
      for (const index in line) {
        const item = line[index];
        if (item !== "") {
          stacks[index] = [item, ...(stacks.at(index) ?? [])];
        }
      }
      return stacks;
    }, []);

  const moves = moveLines
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const movePattern = /move (?<num>\d+) from (?<from>\d+) to (?<to>\d+)/gm;
      const match = movePattern.exec(line);
      return {
        num: parseInt(match?.groups.num, 10),
        fromIndex: parseInt(match?.groups.from, 10) - 1,
        toIndex: parseInt(match?.groups.to, 10) - 1,
      };
    });

  for (const { num, fromIndex, toIndex } of moves) {
    grid[toIndex] = [
      ...grid[toIndex],
      ...grid[fromIndex].splice(grid[fromIndex].length - num, num),
    ];
  }

  return grid.map((stack) => stack.pop() ?? " ").join("");
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
