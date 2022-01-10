import { Agent } from "./agent.mjs";

const agent = new Agent("awesome bot");

const myArgs = process.argv.slice(2);
if (myArgs[0]) {
  agent.joinGame(myArgs[0]);
} else {
  agent.startSoloGame();
}
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
