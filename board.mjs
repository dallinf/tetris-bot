import { Move } from "./move.mjs";

const GAP_WEIGHT = -1;
const CLEARED_WEIGHT = 2;
const HEIGHT_WEIGHT = -3;

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
    let pieceBelow = false;

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
        for (let i = row + 1; i < this.state.length; i++) {
          if (this.state[i][col]) {
            result = false;
          }
        }

        // must have at least one piece directly below
        if (row === 0) {
          pieceBelow = true;
        } else if (row - 1 >= 0 && this.state[row - 1][col]) {
          pieceBelow = true;
        }
      }
    });

    return result && pieceBelow;
  }

  nextValidPlacement(piece) {
    let bestPlace;
    let bestScore = -1000000;

    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state[i].length; j++) {
        const newPlace = Move.shift(piece, i, j);
        const { score, place } = this.evaluatePieceLocation(newPlace);

        if (score > bestScore) {
          bestPlace = place;
          bestScore = score;
        }
      }
    }

    // if (bestPlace) {
    //   const newBoard = this.applyPiece(bestPlace);
    //   console.log("height: " + this.countHeight(newBoard));
    //   console.log("gap: " + this.countGaps(newBoard));
    //   console.log("cleared: " + this.countClearedRows(newBoard));
    // }

    return bestPlace;
  }

  evaluatePieceLocation(piece) {
    let bestPiece = piece;
    let bestScore = -1000000;

    let rotated = JSON.parse(JSON.stringify(piece));

    for (let i = 0; i < 4; i++) {
      // check all 4 rotations
      rotated = Move.rotate(rotated);

      if (this.isValid(rotated)) {
        const newState = this.applyPiece(rotated);
        const clearedRows = this.countClearedRows(newState);
        const gaps = this.countGaps(newState);
        const height = this.countHeight(newState);
        const score =
          gaps * GAP_WEIGHT +
          clearedRows * CLEARED_WEIGHT +
          height * HEIGHT_WEIGHT;

        if (score > bestScore) {
          bestScore = score;
          bestPiece = rotated;
        }
      }
    }

    return { score: bestScore, place: bestPiece };
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
      newState.forEach((row) => {
        let cleared = true;
        row.forEach((col) => {
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

  countGaps(newState) {
    let gaps = 0;

    if (newState) {
      for (let j = 0; j < newState[0].length; j++) {
        let foundBlock = false;

        for (let i = newState.length - 1; i >= 0; i--) {
          if (foundBlock && !newState[i][j]) {
            gaps++;
          }
          if (newState[i][j]) {
            foundBlock = true;
          }
        }
      }
    }

    return gaps;
  }

  countHeight(newState) {
    let maxHeight = 0;

    if (newState) {
      for (let j = 0; j < newState[0].length; j++) {
        for (let i = newState.length - 1; i >= 0; i--) {
          if (newState[i][j]) {
            if (i > maxHeight) {
              maxHeight = i;
            }
          }
        }
      }
    }

    return maxHeight;
  }
}
