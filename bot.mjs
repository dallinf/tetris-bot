import { Server } from "./server.mjs";

class Location {
  constructor(state, board) {}
}

const loc = new Location({}, {});
const server = new Server();

// create game
const gameID = await server.createGame({
  seats: 1,
  turns: 1,
  initial_garbage: 0,
});

console.log(gameID);

const PLAYER_NAME = "BOT_ONE";
const joinGame = await server.joinGame(gameID, PLAYER_NAME);
// console.log(gameName);
const playerMoves = await server.playerMoves({
  locations: [
    {
      row: 0,
      col: 0,
    },
    {
      row: 0,
      col: 0,
    },
    {
      row: 0,
      col: 0,
    },
    {
      row: 0,
      col: 0,
    },
  ],
});
