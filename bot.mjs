import { Agent } from "./agent.mjs";

const agent = new Agent();

const myArgs = process.argv.slice(2);

if (myArgs.length < 2) {
  console.log("Usage: node bot.mjs <name> <number of turns> or <game id>");
} else {
  const name = myArgs[0];

  if (myArgs[1].length > 2) {
    const gameId = myArgs[1];
    await agent.joinGame(gameId, name);
    console.log(`Joined game: ${gameId}`);
  } else {
    const gameId = await agent.startGame(name, parseInt(myArgs[1]));
    console.log(`Started game: ${gameId}`);
  }

  await agent.run();
}
