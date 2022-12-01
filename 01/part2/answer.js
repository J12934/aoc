import { readFile } from "node:fs/promises";

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  const [elfTop1, elfTop2, elfTop3] = fileContent
    .split("\n\n")
    .map((group) => group.split("\n"))
    .map((group) => group.map((numAsString) => parseInt(numAsString, 10)))
    .map((group) => group.reduce((sum, calory) => sum + calory, 0))
    .filter(Boolean)
    .sort((a, b) => a - b)
    .reverse();

  return elfTop1 + elfTop2 + elfTop3;
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
