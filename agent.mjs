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

  async startSoloGame(playerName) {
    const gameId = await this.server.createGame({
      seats: 1,
      turns: 1,
      initial_garbage: 0,
    });

    const currentState = await this.server.joinGame(gameId, playerName);
    this.game.update(currentState.data);
    this.playerId = currentState.playerId;
    this.player = this.game.getPlayer(currentState.playerId);
  }

  updateGame(game) {
    this.game.update(game);
  }

  run() {
    while (this.game.isActive) {
      move = this.board.nextValidPlacement(
        this.game.currentPiece,
        this.player.board
      );
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
