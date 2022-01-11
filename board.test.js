import { expect } from "@jest/globals";
import { Board } from "./board.mjs";

test("adds 1 + 2 to equal 3", () => {
  const b = new Board();
  expect(b.isValid({}, {})).toBeTruthy();
});
