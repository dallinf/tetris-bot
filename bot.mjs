import { Server } from "./server.mjs";

class Location {
  constructor(state, board) {}
}

const loc = new Location({}, {});
const server = new Server();

// create game
await server.post(
  "/",
  {},
  {
    seats: 0,
    turns: 0,
    initial_garbage: 0,
  }
);
