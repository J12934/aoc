import test from "node:test";
import assert from "node:assert/strict";

import { calc } from "./answer.js";

test("should calc examples correctly", async (t) => {
  await t.test("actual example", async () => {
    assert.equal(calc("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
  });
  await t.test("additional example 1", async () => {
    assert.equal(calc("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
  });
  await t.test("additional example 2", async () => {
    assert.equal(calc("nppdvjthqldpwncqszvftbrmjlhg"), 6);
  });
  await t.test("additional example 3", async () => {
    assert.equal(calc("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
  });
  await t.test("additional example 4", async () => {
    assert.equal(calc("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
  });
});
