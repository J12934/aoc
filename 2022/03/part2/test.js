import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { calc, run } from "./answer.js";

run();

test("Sum function", async (t) => {
  await t.test("It should add two numbers", async () => {
    const fileContent = await readFile("input-test.txt", {
      encoding: "utf-8",
    });

    assert.equal(calc(fileContent), 70);
  });
});
