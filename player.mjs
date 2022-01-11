import { Board } from "./board.mjs";

export class Player {
  //   attr_reader :board
  board;
  id;
  name;
  disqualified;
  score;
  lines;

  constructor() {
    this.board = new Board();
  }

  update(state) {
    this.board.update(state["board"]);
    this.id = state["id"];
    this.name = state["name"];
    this.disqualified = state["disqualified"];
    this.score = state["score"];
    this.lines = state["lines"];
    // this.last_move = Move.new({'locations' => state['last_move']}, @board) if state['last_move']
  }
}
