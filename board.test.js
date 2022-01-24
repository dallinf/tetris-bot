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

    describe("countAvgHeight", () => {
      test("simple", () => {
        const b = new Board();
        data[1] = [null, "J", "J", null, null, null, "O", "O", "L", null];
        data[0] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", "I"];
        b.state = data;

        const stats = b.getHeightStats(b.state);
        expect(stats.minHeight).toBe(1);
        expect(stats.maxHeight).toBe(2);
      });
    });

    test("where there are gaps to the floor", () => {
      const b = new Board();
      data[3] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[2] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[1] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[0] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      b.state = data;

      let piece = Move.convertPiece("Z");
      piece = Move.shift(piece, 4, 8);

      const newState = b.applyPiece(piece);
      expect(b.countGaps(newState)).toBe(5);
    });
  });

  describe("countFutureFlexibility", () => {
    test("all pieces possible", () => {
      const b = new Board();
      data[0] = [null, null, null, null, "I", null, null, null, null, null];
      b.state = data;

      expect(b.countFutureFlexibility(data)).toBe(7);
    });

    test("5 pieces possible", () => {
      const b = new Board();
      data[0] = [null, null, null, null, null, null, null, null, null, null];
      b.state = data;

      expect(b.countFutureFlexibility(data)).toBe(5);
    });

    // test("7 pieces possible because of cleared rows", () => {
    //   const b = new Board();
    //   data[1] = [null, null, "I", "I", "I", "I", "I", "I", "I", "I"];
    //   data[0] = [null, "I", "I", "I", "I", "I", "I", "I", "I", "I"];
    //   b.state = data;

    //   expect(b.countFutureFlexibility(data)).toBe(7);
    // });
  });

  describe("getHeightStats", () => {
    test("last column", () => {
      const b = new Board();
      data[2] = [null, null, null, null, null, null, null, null, null, "I"];
      data[1] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", "I"];
      data[0] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", "I"];

      expect(b.getHeightStats(data).maxHeight).toBe(3);
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
      expect(b.state[0][0]).toBeFalsy();
    });
  });

  describe("evaluatePieceLocation", () => {
    test("place on top scores < 0", () => {
      const b = new Board();
      data[0] = ["J", "J", "J", "L", "L", "O", "O", "O", "L", null];
      b.state = data;

      const piece = Move.convertPiece("I");
      const { score } = b.evaluatePieceLocation(piece, "I");
      expect(score).toBeLessThan(0);
    });

    test("T as first piece", () => {
      const b = new Board();
      b.state = data;

      let newPiece = Move.convertPiece("T");
      const { score, place } = b.evaluatePieceLocation(newPiece, "T");

      expect(place).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 1],
      ]);
    });

    test("O that shouldn't increase height", () => {
      const b = new Board();
      data = [
        ["I", "J", "J", "J", "Z", "Z", null, "I", "S", "S"],
        ["I", "Z", "Z", "J", "Z", "Z", "L", null, "T", "T"],
        ["I", "J", "J", "J", null, "Z", "L", null, "Z", "T"],
        ["I", "L", "L", "L", null, "O", "O", null, "Z", "Z"],
        [null, "O", "O", "L", null, "O", "O", null, null, "Z"],
        [null, "O", "O", "S", null, "L", "L", null, "O", "O"],
        [null, null, "S", "S", null, "L", null, null, "O", "O"],
        [null, null, "S", "S", null, "L", null, null, "O", "O"],
        [null, null, "S", "S", null, null, null, null, "O", "O"],
        [null, null, "S", null, null, null, null, null, null, null],
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
      b.state = data;

      let newPiece = Move.convertPiece("O");
      newPiece = Move.shift(newPiece, 10, 2);
      const place1 = b.evaluatePieceLocation(newPiece, "O");

      newPiece = Move.shift(newPiece, 9, 8);
      const place2 = b.evaluatePieceLocation(newPiece, "O");

      expect(place2.score).toBeGreaterThan(place1.score);
    });

    test("I that shouldn't increase height", () => {
      const b = new Board();
      data = [
        [null, "L", "L", "S", "L", "L", "L", "L", "Z", "Z"],
        [null, "L", "S", "S", "L", null, "L", "Z", "Z", "T"],
        [null, "L", "S", null, "L", null, "L", "S", "T", "T"],
        [null, null, null, null, null, null, "S", "S", null, "T"],
        [null, null, null, null, null, null, "S", "O", "O", null],
        [null, null, null, null, null, null, null, "O", "O", null],
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
      b.state = data;

      let newPiece = Move.convertPiece("I");
      newPiece = Move.shift(newPiece, 0, 0);
      const place1 = b.evaluatePieceLocation(newPiece, "I");

      newPiece = Move.shift(newPiece, 5, 6);
      const place2 = b.evaluatePieceLocation(newPiece, "I");

      expect(place2.score).toBeLessThan(place1.score);
    });
  });

  describe("nextValidPlacement", () => {
    test("T as first piece", () => {
      const b = new Board();
      b.state = data;

      const place = b.nextValidPlacement("T");

      expect(place[0][0]).toBeLessThanOrEqual(2);
      expect(place[1][0]).toBeLessThanOrEqual(2);
      expect(place[2][0]).toBeLessThanOrEqual(2);
      expect(place[3][0]).toBeLessThanOrEqual(2);
    });

    test("Z piece with no great options", () => {
      const b = new Board();
      data[3] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[2] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[1] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      data[0] = ["I", "I", "I", "I", "I", "I", "I", "I", "I", null];
      b.state = data;

      const place = b.nextValidPlacement("Z");

      expect(place[0][0]).toBeLessThanOrEqual(5);
      expect(place[1][0]).toBeLessThanOrEqual(5);
      expect(place[2][0]).toBeLessThanOrEqual(5);
      expect(place[3][0]).toBeLessThanOrEqual(5);
    });
  });
});
