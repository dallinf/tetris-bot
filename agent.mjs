import { Game } from "./game.mjs";
import { Move } from "./move.mjs";
import { Server } from "./server.mjs";
import { Board } from "./board.mjs";
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
      initial_garbage: 0,
    });

    const currentState = await this.server.joinGame(this.gameId, playerName);
    this.game.update(currentState.data);
    this.playerId = currentState.playerId;
    this.turnToken = currentState.turnToken;
    this.player = this.game.getPlayer(currentState.playerId);
    this.board = this.player.board;
  }

  updateGame(game) {
    this.game.update(game);
    this.player = this.game.getPlayer(this.playerId);
    this.board = this.player.board;
  }

  async run() {
    let activeGame = true;
    let wait = 0;

    while (activeGame && this.game.isActive) {
      // Figure out the next best move
      let x;
      const piece = Move.convertPiece(this.game.currentPiece);

      const newPiece = this.board.nextValidPlacement(piece);

      if (newPiece) {
        const playerMoveParams = Move.pieceToRowCol(newPiece);

        console.log(playerMoveParams);
        const moveResponse = await this.server.playerMoves(
          this.gameId,
          this.turnToken,
          this.playerId,
          { locations: playerMoveParams }
        );

        // Make that move
        // # no move = make intentionally invalid move, can't win
        // move = move ? move.as_json() : {};
        if (moveResponse.statusCode === 403) {
          console.log("invalid move");
          console.log(this.board);
          console.log(playerMoveParams);
        } else if (moveResponse.statusCode === 410) {
          // we lost
          activeGame = false;
        } else {
          this.turnToken = moveResponse.turnToken;
          this.updateGame(moveResponse.data);
        }

        wait = 0;
      } else {
        if (wait > 10) {
          activeGame = false;
        } else {
          const myPromise = new Promise((resolve) => {
            setTimeout(() => {
              wait += 1;
              resolve();
            }, 1000);
          });
          await myPromise;
        }
      }
    }
  }
}
