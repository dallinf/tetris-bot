import { Agent } from "./agent.mjs";

const agent = new Agent("awesome bot");

const myArgs = process.argv.slice(2);
if (myArgs[0]) {
  agent.joinGame(myArgs[0]);
} else {
  agent.startSoloGame();
}
