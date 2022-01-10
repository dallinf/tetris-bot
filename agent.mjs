import { Game } from "./game.mjs";
import { Move } from "./move.mjs";
import { Server } from "./server.mjs";

export class Agent {
  gameName;
  game;
  gameId;
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
    this.gameId = await this.server.createGame({
      seats: 1,
      turns: 1,
      initial_garbage: 0,
    });

    const currentState = await this.server.joinGame(this.gameId, playerName);
    this.game.update(currentState.data);
    this.playerId = currentState.playerId;
    this.turnToken = currentState.turnToken;
    this.player = this.game.getPlayer(currentState.playerId);
  }

  updateGame(game) {
    this.game.update(game);
  }

  async run() {
    while (this.game.isActive) {
      // Figure out the next best move
      const x = Move.pieceToRowCol(Move.convertPiece(this.game.currentPiece));
      console.log(x);
      const a = await this.server.playerMoves(
        this.gameId,
        this.turnToken,
        this.playerId,
        { locations: x }
      );

      // move = this.board.nextValidPlacement(
      //   this.game.currentPiece,
      //   this.player.board
      // );

      // Make that move
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
        // TODO
        // Update the board
        this.updateGame(JSON.parse(response.body));
      }
    }
  }
}
