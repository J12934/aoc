import { readFile } from "node:fs/promises";

const toPlays = {
  "rock win": "paper",
  "rock draw": "rock",
  "rock loss": "scissor",

  "paper draw": "paper",
  "paper loss": "rock",
  "paper win": "scissor",

  "scissor loss": "paper",
  "scissor win": "rock",
  "scissor draw": "scissor",
};

const states = {
  "rock vs paper": "loss",
  "rock vs rock": "draw",
  "rock vs scissor": "win",

  "paper vs paper": "draw",
  "paper vs rock": "win",
  "paper vs scissor": "loss",

  "scissor vs paper": "win",
  "scissor vs rock": "loss",
  "scissor vs scissor": "draw",
};

const bonusPoints = {
  paper: 2,
  rock: 1,
  scissor: 3,
};

const winPoints = {
  win: 6,
  draw: 3,
  loss: 0,
};

/**
 *
 * @param {string} fileContent
 */
export function calc(fileContent) {
  return fileContent
    .replaceAll("A", "rock")
    .replaceAll("B", "paper")
    .replaceAll("C", "scissor")
    .replaceAll("X", "loss")
    .replaceAll("Y", "draw")
    .replaceAll("Z", "win")
    .split("\n")
    .filter(Boolean)
    .map((gameString) => gameString.split(" "))
    .map(([elf, desiredResult]) => [elf, toPlays[`${elf} ${desiredResult}`]])
    .map(([elf, me]) => ({
      state: states[`${me} vs ${elf}`],
      bonusPoints: bonusPoints[me],
    }))
    .reduce(
      (sum, { state, bonusPoints }) => sum + (winPoints[state] + bonusPoints),
      0
    );
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
