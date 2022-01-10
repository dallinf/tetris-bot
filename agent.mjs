import { Game } from "./game.mjs";
import { Server } from "./server.mjs";

export class Agent {
  gameName;
  game;
  server;
  location;
  turnToken;
  playerId;
  player;
  board;

  constructor(gameName) {
    this.gameName = gameName;
    this.game = new Game();
    this.server = new Server();
  }

  async startSoloGame() {
    const response = await this.server.post(
      "/",
      JSON.stringify({
        seats: 0,
        turns: 0,
        initial_garbage: 0,
      })
    );
    console.log("asdf");
    console.log(response);
    // console.log(JSON.parse(response));
    this.joinGame(response["location"]);
  }

  joinGame(location) {
    this.location = location;
    const response = this.server.post(location + "/players", {
      name: this.gameName,
    });
    this.turnToken = response["X-Turn-Token"];
    this.playerId = response["X-Player-Id"];
    this.updateGame(JSON.parse(response.body));
    this.player = this.game.player(this.playerId);
    this.board = this.player.board;
  }

  updateGame(game) {
    this.game.update(game);
  }

  run() {
    while (this.game.active) {
      move = this.board.next_valid_placement(this.game.current_piece);
      // # no move = make intentionally invalid move, can't win
      move = move ? move.as_json() : {};
      response = this.server.post(this.location + "/moves", move, {
        "X-Turn-Token": this.turnToken,
      });
      if (response.code !== "200") {
        console.log(response.body);
        break;
      } else {
        this.turnToken = response["X-Turn-Token"];
        this.updateGame(JSON.parse(response.body));
      }
    }
  }
}
