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

  isValid(board, piece) {
    // TODO
    // move.support.any?{ |l| l.row < 0 or at(l) } and
    // move.above.all?{ |l| not at(l) }
    return true;
  }

  rotatePiece(piece) {
    // TODO
  }

  nextValidPlacement(piece) {
    // TODO:
    // Figure out the next best move
    // Loop over all rows and cols
    //  If there is an empty space, need to evaluate that spot
    //
  }

  evaluateLocation(board, piece, location) {
    // TODO
    // rotate piece 4 times, see how many rows it clears
  }

  applyPiece(piece) {
    if (this.isValid(this, piece)) {
      let newBoard = JSON.parse(JSON.stringify(this.state));
      piece.forEach((block) => {
        newBoard[block[0]][block[1]] = "x";
      });

      return newBoard;
    }

    return null;
  }

  countClearedRows(piece) {
    // TODO:
    // Figure out how many rows this would clear
    return 0;
  }
}
