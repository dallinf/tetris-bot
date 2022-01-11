import { Agent } from "./agent.mjs";

const agent = new Agent("awesome bot");

const myArgs = process.argv.slice(2);
if (myArgs[0]) {
  await agent.joinGame(myArgs[0], "Bot Two");
} else {
  await agent.startSoloGame("Bot One");
}

await agent.run();
