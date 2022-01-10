export class Game {
  players = {};
  state = "";
  rows = 0;
  cols = 0;

  constructor() {
    this.players = {};
  }

  update(state) {
    // this.state = state['state']
    //   this.rows = state['rows']
    //   this.cols = state['cols']
    // this.current_piece = state['current_piece']
    //   this.next_piece = state['next_piece']
    //   state['players'].forEach(player => {
    //     id = player['id']
    //     this.players[id] = new Player();
    //     this.players[id].update(player)
    //   }
  }

  getPlayer(id) {
    this.players[id];
  }

  isActive() {
    return this.state == "in play";
  }
}
