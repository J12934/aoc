import { readFile } from "node:fs/promises";

const moveVectors = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

export function calc(fileContent: string) {
  const moves = fileContent.split("\n").map((line) => {
    const [direction, length] = line.split(" ") as [
      "U" | "D" | "L" | "R",
      string
    ];
    return { direction, length: parseInt(length, 10) };
  });

  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  const positions = new Set<string>();

  for (const move of moves) {
    let moveVector = moveVectors[move.direction];

    for (let i = 0; i < move.length; i++) {
      head.x += moveVector.x;
      head.y += moveVector.y;

      positions.add(`[${tail.x}, ${tail.y}]`);
      const distanceX = Math.abs(head.x - tail.x);
      const distanceY = Math.abs(head.y - tail.y);
      if (distanceX > 1 || distanceY > 1) {
        tail.x = head.x - moveVector.x;
        tail.y = head.y - moveVector.y;
      }
    }
  }

  print(positions, 5);

  return positions.size;
}

function print(positions: Set<string>, size: number) {
  for (let y = -size; y < size; y++) {
    let line = "";
    for (let x = -size; x < size; x++) {
      line += positions.has(`[${x}, ${y}]`) ? "#" : " ";
    }
    console.log(line);
  }
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}
