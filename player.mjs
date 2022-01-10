import { Board } from "./board.mjs";

export class Player {
  //   attr_reader :board
  board;

  constructor() {
    this.board = new Board();
  }

  update(state) {
    // @board.update(state['board'])
    // @id = state['id']
    // @name = state['name']
    // @disqualified = state['disqualified']
    // @score = state['score']
    // @lines = state['lines']
    // @last_move = Move.new({'locations' => state['last_move']}, @board) if state['last_move']
  }
}
