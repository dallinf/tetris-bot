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

  isValid(move) {
    // move.support.any?{ |l| l.row < 0 or at(l) } and
    // move.above.all?{ |l| not at(l) }
  }

  nextValidPlacement(piece) {
    move = Move.mask_for(piece, self)
    loop do
      return move if valid?(move)
      break unless move.shift
    end
  }
}
