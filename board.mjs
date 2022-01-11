import { Move } from "./move.mjs";
export class Board {
  //   attr_reader :topmost, :rightmost
  state;
  topmost;
  rightmost;

  update(state) {
    this.state = state;
    this.topmost = state.size - 1;
    this.rightmost = state[0].size - 1;
  }

  at(location) {
    this.state[location.row][location.col];
  }

  isValid(piece) {
    if (!piece) {
      return false;
    }

    let result = true;

    piece.forEach((block) => {
      let row = block[0];
      let col = block[1];

      // out of bounds
      if (
        row < 0 ||
        col < 0 ||
        row > this.state.length - 1 ||
        col > this.state[0].length - 1
      ) {
        result = false;
      } else {
        // something is already there
        if (this.state[row][col]) {
          result = false;
        }

        // can go straight down
        for (let i = row + 1; i < this.state[row].length - 1; i++) {
          if (this.state[i][col]) {
            result = false;
          }
        }
      }
    });
    return result;
  }

  rotatePiece(piece) {
    // TODO
  }

  nextValidPlacement(piece) {
    let bestPlace;
    let bestScore = -1;

    for (let i = 0; i < this.state.length - 1; i++) {
      for (let j = 0; j < this.state[i].length - 1; j++) {
        const newPlace = Move.shift(piece, i, j);
        const score = this.evaluatePieceLocation(newPlace);

        if (score > bestScore) {
          bestPlace = newPlace;
          bestScore = score;
        }
      }
    }

    return bestPlace;
  }

  evaluatePieceLocation(piece) {
    if (!this.isValid(piece)) {
      return -1;
    }

    const newState = this.applyPiece(piece);
    return this.countClearedRows(newState);
  }

  applyPiece(piece) {
    let newBoard = JSON.parse(JSON.stringify(this.state));
    piece.forEach((block) => {
      newBoard[block[0]][block[1]] = "x";
    });

    return newBoard;
  }

  countClearedRows(newState) {
    let clearedRows = 0;
    if (newState) {
      newState.forEach((rows) => {
        let cleared = true;
        rows.forEach((col) => {
          if (!col) {
            cleared = false;
          }
        });

        if (cleared) {
          clearedRows++;
        }
      });
    }

    return clearedRows;
  }
}
