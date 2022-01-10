export class Location {
//   attr_accessor :row, :col
board;
topmost;
row;
col;
​
  initialize(state, board) {
    this.board = board
    this.topmost = this.board.topmost
    this.row = state['row']
    this.col = state['col']
  }
​
  above() {
    // (@row+1..@topmost).map{ |row| Location.new({'row' => row, 'col' => @col}, @board) }
  }
​
​
}