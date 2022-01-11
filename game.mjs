import { Player } from "./player.mjs";
export class Game {
  players = {};
  state = "";
  rows = 0;
  cols = 0;
  currentPiece = "";
  nextPiece = "";

  constructor() {
    this.players = {};
  }

  update(state) {
    this.state = state["state"];
    this.rows = state["rows"];
    this.cols = state["cols"];
    this.currentPiece = state["current_piece"];
    this.nextPiece = state["next_piece"];
    state["players"].forEach((player) => {
      const id = player["id"];
      this.players[id] = new Player();
      this.players[id].update(player);
    });
  }

  getPlayer(id) {
    return this.players[id];
  }

  isActive() {
    return this.state == "in play";
  }
}
