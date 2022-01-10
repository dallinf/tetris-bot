export class Move {
//   reader :locations, :support, :above
  locations;
  support;
  above;
​
  initialize(state, board) {
    this.rightmost = board.rightmost
    this.topmost = board.topmost
    // this.locations = state['locations'].map{ |location| Location.new(location, board) }
    // this.support = @locations.group_by{ |l| l.col }.map{ |col,locs| Location.new({'row' => locs.map(&:row).min - 1, 'col' => col}, board) }
    // this.above = this.support.map{ |l| (l.row+1..@topmost).map{ |row| Location.new({'row' => row, 'col' => l.col}, board) } }.flatten
  }
​
  shift() {
    // cols = this.locations.map(&:col)
    // rows = this.locations.map(&:row)
    // if cols.all?{ |c| c < @rightmost }
    //   @locations.each{ |l| l.col += 1 }
    //   @support.each{ |l| l.col += 1 }
    //   @above.each{ |l| l.col += 1 }
    //   true
    // elsif rows.all?{ |r| r < @topmost }
    //   rewind = cols.min
    //   @locations.each{ |l| l.col -= rewind; l.row += 1 }
    //   @support.each{ |l| l.col -= rewind; l.row += 1 }
    //   @above.each{ |l| l.col -= rewind; l.row += 1 }
    //   @above.reject!{ |l| l.row > @topmost }
    //   true
    // end
  }
​
//   self.dense(board, *locations)
//     new({'locations' => locations.map{ |row,col| {'row' => row, 'col' => col}}}, board)
//   end
// ​
//   def self.mask_for(piece, board)
//     case piece
//     when 'I' then Move.dense(board, [0, 0], [1, 0], [2, 0], [3, 0])
//     when 'J' then Move.dense(board, [0, 0], [0, 1], [1, 1], [2, 1])
//     when 'L' then Move.dense(board, [0, 0], [0, 1], [1, 0], [2, 0])
//     when 'S' then Move.dense(board, [0, 0], [0, 1], [1, 1], [1, 2])
//     when 'Z' then Move.dense(board, [0, 0], [1, 0], [1, 1], [2, 1])
//     when 'T' then Move.dense(board, [0, 0], [0, 1], [0, 2], [1, 1])
//     when 'O' then Move.dense(board, [0, 0], [0, 1], [1, 0], [1, 1])
//     end
//   end
​

}
