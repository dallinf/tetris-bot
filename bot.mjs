import { Agent } from "./agent.mjs";

const agent = new Agent("awesome bot");

const myArgs = process.argv.slice(2);
if (myArgs[0]) {
  await agent.joinGame(myArgs[0], "Bot Two");
} else {
  await agent.startSoloGame("Bot One");
}

await agent.run();

// const PLAYER_NAME = "BOT_ONE";
// // create game
// const gameID = await server.createGame({
//   seats: 1,
//   turns: 1,
//   initial_garbage: 0,
// });
// console.log(gameID);
// // joining game
// const { xTurnToken, xPlayerId } = await server.joinGame(gameID, PLAYER_NAME);
// console.log({ xTurnToken, xPlayerId });
// // initiating moves
// const { statusCode, responseText } = await server.playerMoves(
//   gameID,
//   xTurnToken,
//   xPlayerId,
//   {
//     locations: [
//       {
//         row: 1,
//         col: 1,
//       },
//       {
//         row: 2,
//         col: 2,
//       },
//       {
//         row: 3,
//         col: 3,
//       },
//       {
//         row: 4,
//         col: 4,
//       },
//     ],
//   }
// );
// console.log(statusCode, responseText);
