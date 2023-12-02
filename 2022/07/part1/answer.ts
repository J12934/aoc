import { readFile } from "node:fs/promises";

interface Directory {
  directories: Map<string, Directory>;
  files: Map<string, number>;
}

export function calc(fileContent: string) {
  const lines = fileContent.split("\n");

  let pwd: string[] = [];

  const tree = {
    directories: new Map<string, Directory>(),
    files: new Map<string, number>(),
  };

  for (const line of lines) {
    if (line.startsWith("$")) {
      const [_, command, arg] = line.split(" ");

      if (command === "cd") {
        if (arg === "..") {
          pwd.pop();
          addDirectory(tree, pwd);
        } else {
          pwd.push(arg);
          addDirectory(tree, pwd);
        }
      }
    } else {
      if (line.startsWith("dir")) {
        const [_, directoryName] = line.split(" ");
        addDirectory(tree, [...pwd, directoryName]);
      } else {
        const [fileSize, fileName] = line.split(" ");
        addFile(tree, [...pwd, fileName], parseInt(fileSize, 10));
      }
    }
  }

  printTree(tree, "");

  const foldersUnderLimit: number[] = [];
  calculateTotalSizeOfDirectoriesUnderLimit(tree, foldersUnderLimit);

  return foldersUnderLimit.reduce((sum, value) => sum + value, 0);
}

function addDirectory(tree: Directory, path: string[]) {
  if (path.length === 1) {
    const directoryName = path[0];
    if (!tree.directories.has(directoryName)) {
      tree.directories.set(directoryName, {
        directories: new Map<string, Directory>(),
        files: new Map<string, number>(),
      });
      return;
    }
    // nothing to do, directory is already known
  } else {
    const [directoryName, ...remainingPath] = path;
    if (tree.directories.has(directoryName)) {
      addDirectory(
        tree.directories.get(directoryName) as Directory,
        remainingPath
      );
    } else {
      console.warn(
        "Add folder doesn't have directory called: " + directoryName
      );
    }
    return;
  }
}

function addFile(
  tree: { directories: Map<string, Directory>; files: Map<string, number> },
  path: string[],
  fileSize: number
) {
  if (path.length === 1) {
    const filename = path[0];
    tree.files.set(filename, fileSize);
  } else {
    const [directoryName, ...remainingPath] = path;
    if (tree.directories.has(directoryName)) {
      addFile(
        tree.directories.get(directoryName) as Directory,
        remainingPath,
        fileSize
      );
    } else {
      console.warn("Add file doesn't have directory called: " + directoryName);
    }
    return;
  }
}

function printTree(tree: Directory, indent: string) {
  for (const [directoryName, directory] of tree.directories.entries()) {
    console.log(`${indent}- ${directoryName} (dir)`);
    printTree(directory, indent + "  ");
  }
  for (const [filename, size] of tree.files.entries()) {
    console.log(`${indent}- ${filename} (file, size=${size})`);
  }
}

export async function run() {
  const fileContent = await readFile(process.argv[process.argv.length - 1], {
    encoding: "utf-8",
  });
  const result = calc(fileContent);
  console.log(result);
}

function calculateTotalSizeOfDirectoriesUnderLimit(
  tree: Directory,
  foldersUnderLimit: number[]
): number {
  const childDirSum = [...tree.directories.values()]
    .map((directory) =>
      calculateTotalSizeOfDirectoriesUnderLimit(directory, foldersUnderLimit)
    )
    .reduce((sum, value) => sum + value, 0);

  const fileSizeSum = [...tree.files.values()].reduce(
    (sum, value) => sum + value,
    0
  );

  const sum = childDirSum + fileSizeSum;

  if (sum < 100000) {
    foldersUnderLimit.push(sum);
  }

  return sum;
}
