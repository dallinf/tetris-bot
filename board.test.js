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

  describe("isValid", () => {
    test("simple", () => {
      const b = new Board();
      b.state = data;

      let piece = Move.convertPiece("T");
      expect(b.isValid(piece)).toBeTruthy();
    });

    test("piece goes out of bounds", () => {
      const b = new Board();
      b.state = data;

      let piece = Move.convertPiece("T");
      piece = Move.shift(piece, 0, 9);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("T on top of O", () => {
      const b = new Board();
      data[0] = ["O", "O", null, null, null, null, null, null, null, null];
      data[1] = ["O", "O", null, null, null, null, null, null, null, null];
      b.state = data;

      let piece = Move.convertPiece("T");
      piece = Move.shift(piece, 0, 1);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("O under a S", () => {
      const b = new Board();
      data[0] = ["S", "S", null, null, null, null, null, null, null, null];
      data[1] = [null, "S", "S", null, null, null, null, null, null, null];
      b.state = data;

      let piece = Move.convertPiece("O");
      piece = Move.shift(piece, 0, 2);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("O under blocks", () => {
      const b = new Board();
      data[5] = [null, "T", null, null, null, null, null, null, null, null];
      data[4] = ["T", "T", "T", null, null, null, null, null, null, null];
      data[3] = [null, null, "O", "O", null, null, null, null, null, null];
      data[2] = [null, null, "O", "O", null, null, null, null, null, null];
      data[1] = [null, null, "O", "O", null, null, null, null, null, null];
      data[0] = [null, null, "O", "O", null, null, null, null, null, null];
      b.state = data;

      let piece = Move.convertPiece("O");
      piece = Move.shift(piece, 0, 0);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("J under blocks", () => {
      const b = new Board();
      data[2] = [null, null, "O", "O", null, null, null, null, "S", null];
      data[1] = [null, null, "O", "O", null, null, null, "S", "S", null];
      data[0] = [null, null, "O", "O", null, null, null, "S", null, null];
      b.state = data;

      let piece = Move.convertPiece("J");
      piece = Move.shift(piece, 0, 8);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("test 1", () => {
      const b = new Board();
      data = [
        ["I", "T", "T", "T", "T", "T", "T", "L", "L", null],
        ["I", "I", "Z", null, "J", "I", "I", "L", "O", "O"],
        [null, "I", "Z", "Z", "I", "I", "I", null, "T", null],
        ["J", "J", "Z", "Z", "I", "I", "T", "T", "T", null],
        [null, "J", null, "Z", "I", "O", "O", "T", "O", "O"],
        [null, "J", "S", "S", "I", "O", "O", "Z", "O", "O"],
        ["T", "T", "T", "S", "S", "S", "S", "Z", "Z", null],
        ["I", "T", "L", "L", "L", "L", "S", "S", "Z", null],
        ["I", null, "L", null, "L", "L", "L", "Z", null, null],
        ["I", "Z", "L", null, "L", "L", null, "Z", "Z", null],
        ["I", "Z", "Z", "L", "L", "L", null, null, "Z", null],
        [null, null, "Z", "L", null, null, null, null, null, null],
        [null, null, null, "L", null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
      ];
      b.state = data;

      let piece = [
        [8, 8],
        [8, 9],
        [9, 9],
        [10, 9],
      ];
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("no floating pieces", () => {
      const b = new Board();
      b.state = data;

      let piece = Move.convertPiece("T");
      piece = Move.shift(piece, 1, 0);
      expect(b.isValid(piece)).toBeFalsy();
    });

    test("no floating O pieces", () => {
      const b = new Board();
      b.state = data;

      let piece = Move.convertPiece("O");
      piece = Move.shift(piece, 1, 0);
      expect(b.isValid(piece)).toBeFalsy();
    });
  });

  describe("countClearedRows", () => {
    test("board with one cleared rows", () => {
      const b = new Board();
      data[0] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", null];
      b.state = data;

      let piece = Move.convertPiece("I");
      piece = Move.shift(piece, 0, 9);
      const newState = b.applyPiece(piece);
      expect(b.countClearedRows(newState)).toBe(1);
    });
  });

  describe("countGaps", () => {
    test("second row with a gap", () => {
      const b = new Board();
      data[0] = [null, "J", "J", null, "L", "O", "O", "O", "L", null];
      b.state = data;

      let piece = Move.convertPiece("I");
      piece = Move.rotate(piece);
      piece = Move.shift(piece, 1, 0);
      const newState = b.applyPiece(piece);
      expect(b.countGaps(newState)).toBe(2);
    });

    test("");
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
      expect(b.state[0][0]).toBeFalsy();
    });
  });

  describe("evaluatePieceLocation", () => {
    test("place on top scores < 0", () => {
      const b = new Board();
      data[0] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", null];
      b.state = data;

      const piece = Move.convertPiece("I");
      const { score } = b.evaluatePieceLocation(piece);
      expect(score).toBeLessThan(0);
    });
  });
});
