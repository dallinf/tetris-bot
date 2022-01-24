import { Move } from "./move.mjs";
import { Evaluator } from "./Evaluator.mjs";

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

  nextValidPlacement(pieceType) {
    let bestPlace = [];
    let bestScore = -1000000;

    const piece = Move.convertPiece(pieceType);

    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state[i].length; j++) {
        const newPlace = Move.shift(piece, i, j);
        const { score, place } = this.evaluatePieceLocation(
          newPlace,
          pieceType
        );

        if (score > bestScore) {
          bestPlace = [place];
          bestScore = score;
        } else if (score === bestScore) {
          bestPlace.push(place);
        }
      }
    }

    // if (bestPlace) {
    //   const newBoard = this.applyPiece(bestPlace);
    //   console.log("height: " + this.countHeight(newBoard));
    //   console.log("gap: " + this.countGaps(newBoard));
    //   console.log("cleared: " + this.countClearedRows(newBoard));
    // }

    const randomIndex = Math.floor(Math.random() * bestPlace.length);
    const chosenMove = bestPlace[randomIndex];
    console.log(
      `Type: ${pieceType} - Score: ${bestScore} - Piece: ${JSON.stringify(
        chosenMove
      )}`
    );
    return chosenMove;
  }

  evaluatePieceLocation(piece, pieceType) {
    let bestPiece = [piece];
    let bestScore = -1000000;

    let numRotations = Move.getNumRotations(pieceType);
    let rotated = JSON.parse(JSON.stringify(piece));

    for (let i = 0; i < numRotations; i++) {
      if (i > 0) {
        rotated = Move.rotate(rotated);
      }

      if (this.isValid(rotated)) {
        const newState = this.applyPiece(rotated);
        const clearedRows = this.countClearedRows(newState);
        const gaps = this.countGaps(newState);
        const heightStats = this.getHeightStats(newState);
        const score = Evaluator.getScore(gaps, clearedRows, heightStats);

        if (score > bestScore) {
          bestScore = score;
          bestPiece = [rotated];
        } else if (score === bestScore) {
          bestPiece.push(rotated);
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * bestPiece.length);
    return { score: bestScore, place: bestPiece[randomIndex] };
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

  countFutureFlexibility(newState) {
    const heights = this.getColumnHeights(newState);
    const pieces = {
      T: false,
      Z: false,
      S: false,
      I: false,
      J: false,
      L: false,
      O: false,
    };
    // const pieces = { S: false };

    const oldGaps = this.countGaps(newState);

    heights.forEach((row, col) => {
      Object.keys(pieces).forEach((pieceType) => {
        let piece = Move.convertPiece(pieceType);
        piece = Move.shift(piece, heights[row], col);

        let numRotations = Move.getNumRotations(pieceType);

        for (let i = 0; i < numRotations; i++) {
          if (i > 0) {
            piece = Move.rotate(piece);
          }

          if (this.isValid(piece)) {
            const stateWithPiece = this.applyPiece(piece);
            const newGaps = this.countGaps(stateWithPiece);
            const clearedRows = this.countClearedRows(stateWithPiece);

            if (newGaps <= oldGaps || clearedRows > 0) {
              pieces[pieceType] = true;
            }
          }
        }
      });
    });

    let numFuturePieces = 0;

    Object.values(pieces).forEach((v) => {
      if (v) {
        numFuturePieces++;
      }
    });

    return numFuturePieces;
  }

  getColumnHeights(newState) {
    let heights = [];

    for (let j = 0; j < newState[0].length; j++) {
      heights.push(0);

      for (let i = 0; i < newState.length; i++) {
        if (newState[i][j]) {
          heights[j] = i + 1;
        }
      }
    }

    return heights;
  }

  getHeightStats(newState) {
    let avgHeight = 0;
    let minHeight = 100;
    let maxHeight = 0;

    if (newState) {
      const heights = this.getColumnHeights(newState);

      heights.forEach((height) => {
        if (height < minHeight) {
          minHeight = height;
        }
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      avgHeight = heights.reduce((a, b) => a + b) / heights.length;
    }

    return { minHeight, maxHeight, avgHeight };
  }
}
