import { readFile } from "node:fs/promises";

export function calc(fileContent: string) {
  const grid = fileContent
    .split("\n")
    .map((line) =>
      line.split("").map((treeAsString) => parseInt(treeAsString, 10))
    );

  const gridSize = grid.length;

  let visibleTrees = gridSize * 4 - 4;

  const scoreGrid = grid.map((row, x) =>
    row.map((tree, y) => {
      return (
        calculateScenicScore(grid, x, y, -1, 0) *
        calculateScenicScore(grid, x, y, 1, 0) *
        calculateScenicScore(grid, x, y, 0, -1) *
        calculateScenicScore(grid, x, y, 0, 1)
      );
    })
  );

  const maxScore = Math.max(...scoreGrid.map((row) => Math.max(...row)));

  return { maxScore, scoreGrid };
}

function calculateScenicScore(
  grid: number[][],
  treeX: number,
  treeY: number,
  directionX: number,
  directionY: number
) {
  const gridSize = grid.length;
  const treeSize = grid[treeX][treeY];

  if (directionX !== 0) {
    let score = 0;
    for (
      let x = treeX + directionX;
      0 <= x && x <= gridSize - 1;
      x += directionX
    ) {
      score++;
      console.log(
        `Checking tree [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${x}][${treeY}] (${grid[x][treeY]})`
      );
      if (treeSize <= grid[x][treeY]) {
        console.log(
          `❌ Tree is blocking the view: [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${x}][${treeY}] (${grid[x][treeY]})`
        );
        return score;
      }
    }
    return score;
  }

  if (directionY !== 0) {
    let score = 0;

    for (
      let y = treeY + directionY;
      0 <= y && y <= gridSize - 1;
      y += directionY
    ) {
      score++;
      console.log(
        `Checking tree [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${treeX}][${y}] (${grid[treeX][y]})`
      );
      if (treeSize <= grid[treeX][y]) {
        console.log(
          `❌ Tree is blocking the view [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${treeX}][${y}] (${grid[treeX][y]})`
        );
        return score;
      }
    }
    return score;
  }

  throw new Error("invalid direction");
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
