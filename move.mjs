export class Move {
  static rotate(piece) {
    const pivot = piece[0];
    return piece.map((cell) => {
      return [Move.xPivot(pivot, cell), Move.yPivot(pivot, cell)];
    });
  }

  static xPivot(pivot, cell) {
    return pivot[1] - cell[1] + pivot[0];
  }

  static yPivot(pivot, cell) {
    return pivot[1] - pivot[0] + cell[0];
  }

  static shift(piece, row, col) {
    const rowShift = row - piece[0][0];
    const colShift = col - piece[0][1];
    return piece.map((loc) => {
      return [loc[0] + rowShift, loc[1] + colShift];
    });
  }

  static pieceToRowCol(pieceArray) {
    return pieceArray.map((inner) => {
      return {
        row: inner[0],
        col: inner[1],
      };
    });
  }

  static getNumRotations(pieceType) {
    switch (pieceType) {
      case "I":
      case "O":
        return 1;
      case "S":
      case "Z":
        return 2;
      default:
        return 4;
    }
  }

  static convertPiece(pieceName) {
    switch (pieceName) {
      case "I":
        return [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0],
        ];
      case "J":
        return [
          [0, 0],
          [0, 1],
          [1, 1],
          [2, 1],
        ];
      case "L":
        return [
          [0, 0],
          [0, 1],
          [1, 0],
          [2, 0],
        ];
      case "S":
        return [
          [0, 0],
          [0, 1],
          [1, 1],
          [1, 2],
        ];
      case "Z":
        return [
          [0, 0],
          [1, 0],
          [1, 1],
          [2, 1],
        ];
      case "T":
        return [
          [0, 0],
          [0, 1],
          [0, 2],
          [1, 1],
        ];
      case "O":
        return [
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
        ];
    }
  }
}
