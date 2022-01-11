import { beforeEach, describe, expect, test } from "@jest/globals";
import { Board } from "./board.mjs";
import { Move } from "./move.mjs";

describe("Board", () => {
  let data;

  beforeEach(() => {
    data = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];
  });

  describe("countClearedRows", () => {
    test("board with one cleared rows", () => {
      const b = new Board();
      data[0] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", null];
      b.state = data;

      const piece = Move.convertPiece("I");
      expect(b.countClearedRows(piece)).toBe(1);
    });
  });

  describe("applyPiece", () => {
    test("simple", () => {
      const b = new Board();
      b.state = data;

      const piece = Move.convertPiece("O");
      const newBoard = b.applyPiece(piece);
      expect(newBoard[0][0]).toBe("x");
      expect(newBoard[1][0]).toBe("x");
      expect(newBoard[0][1]).toBe("x");
      expect(newBoard[1][1]).toBe("x");
      console.log(b.state);
      expect(b.state[0][0]).toBeFalsy();
    });
  });
});
