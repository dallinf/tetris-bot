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
  time = 0;

  constructor(gameName) {
    this.gameName = gameName;
    this.game = new Game();
    this.server = new Server();
  }

  async startSoloGame(playerName) {
    this.gameId = await this.server.createGame({
      seats: 1,
      initial_garbage: 0,
    });

    const currentState = await this.server.joinGame(this.gameId, playerName);
    this.game.update(currentState.data);
    this.playerId = currentState.playerId;
    this.turnToken = currentState.turnToken;
    this.player = this.game.getPlayer(currentState.playerId);
    // this.board = this.player.board;
  }

  updateGame(game) {
    this.game.update(game);
  }

  async run() {
    while (this.game.isActive) {
      // Figure out the next best move
      let x;
      const pieceName = Move.convertPiece(this.game.currentPiece);

      if (this.time === 0) {
        x = Move.pieceToRowCol(pieceName);
      } else {
        x = Move.pieceToRowCol(Move.shift(pieceName, 0, 5));
      }

      console.log(x);
      const moveResponse = await this.server.playerMoves(
        this.gameId,
        this.turnToken,
        this.playerId,
        { locations: x }
      );

      this.time++;
      // move = this.board.nextValidPlacement(
      //   this.game.currentPiece,
      //   this.player.board
      // );

      // Make that move
      // # no move = make intentionally invalid move, can't win
      // move = move ? move.as_json() : {};
      if (moveResponse.statusCode !== 200) {
        console.log(response.body);
        break;
      } else {
        // Does the turn token change?
        this.turnToken = moveResponse.turnToken;
        this.updateGame(moveResponse.data);
        console.log(this.game);
      }
    }
  }
}
