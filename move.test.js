import { beforeEach, describe, expect, test } from "@jest/globals";
import { Move } from "./move.mjs";

describe("shift", () => {
  test("from non-initial spot", () => {
    let piece = Move.convertPiece("O");
    piece = Move.shift(piece, 1, 1);
    expect(piece[0]).toEqual([1, 1]);
    expect(piece[1]).toEqual([1, 2]);
    expect(piece[2]).toEqual([2, 1]);
    expect(piece[3]).toEqual([2, 2]);

    piece = Move.shift(piece, 2, 2);
    expect(piece[0]).toEqual([2, 2]);
    expect(piece[1]).toEqual([2, 3]);
    expect(piece[2]).toEqual([3, 2]);
    expect(piece[3]).toEqual([3, 3]);
  });
});

describe("rotate", () => {
  test("T", () => {
    let piece = Move.convertPiece("T");
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([0, 1]);
    expect(piece[2]).toEqual([0, 2]);
    expect(piece[3]).toEqual([1, 1]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([-1, 0]);
    expect(piece[2]).toEqual([-2, 0]);
    expect(piece[3]).toEqual([-1, 1]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([0, -1]);
    expect(piece[2]).toEqual([0, -2]);
    expect(piece[3]).toEqual([-1, -1]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([1, 0]);
    expect(piece[2]).toEqual([2, 0]);
    expect(piece[3]).toEqual([1, -1]);
  });

  test("S", () => {
    let piece = Move.convertPiece("S");
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([0, 1]);
    expect(piece[2]).toEqual([1, 1]);
    expect(piece[3]).toEqual([1, 2]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([-1, 0]);
    expect(piece[2]).toEqual([-1, 1]);
    expect(piece[3]).toEqual([-2, 1]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([0, -1]);
    expect(piece[2]).toEqual([-1, -1]);
    expect(piece[3]).toEqual([-1, -2]);

    piece = Move.rotate(piece);
    expect(piece[0]).toEqual([0, 0]);
    expect(piece[1]).toEqual([1, 0]);
    expect(piece[2]).toEqual([1, -1]);
    expect(piece[3]).toEqual([2, -1]);
  });
});
