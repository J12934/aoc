import { readFile } from "node:fs/promises";

export function calc(fileContent: string) {
  const grid = fileContent
    .split("\n")
    .map((line) =>
      line.split("").map((treeAsString) => parseInt(treeAsString, 10))
    );

  const gridSize = grid.length;

  let visibleTrees = gridSize * 4 - 4;

  for (let x = 1; x < gridSize - 1; x++) {
    for (let y = 1; y < gridSize - 1; y++) {
      const treeVisible =
        isVisible(grid, x, y, -1, 0) ||
        isVisible(grid, x, y, 1, 0) ||
        isVisible(grid, x, y, 0, -1) ||
        isVisible(grid, x, y, 0, 1);

      if (treeVisible) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

function isVisible(
  grid: number[][],
  treeX: number,
  treeY: number,
  directionX: number,
  directionY: number
) {
  const gridSize = grid.length;
  const treeSize = grid[treeX][treeY];

  if (directionX !== 0) {
    for (
      let x = treeX + directionX;
      0 <= x && x <= gridSize - 1;
      x += directionX
    ) {
      console.log(
        `Checking tree [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${x}][${treeY}] (${grid[x][treeY]})`
      );
      if (treeSize <= grid[x][treeY]) {
        console.log(
          `❌ Tree is Not visible: [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${x}][${treeY}] (${grid[x][treeY]})`
        );
        return false;
      }
    }
  }

  if (directionY !== 0) {
    for (
      let y = treeY + directionY;
      0 <= y && y <= gridSize - 1;
      y += directionY
    ) {
      console.log(
        `Checking tree [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${treeX}][${y}] (${grid[treeX][y]})`
      );
      if (treeSize <= grid[treeX][y]) {
        console.log(
          `❌ Tree is Not visible [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}] vs [${treeX}][${y}] (${grid[treeX][y]})`
        );
        return false;
      }
    }
  }
  console.log(
    `✅ Tree is visible [${treeX}][${treeY}](${treeSize}) in dir [${directionX}][${directionY}]`
  );
  return true;
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
