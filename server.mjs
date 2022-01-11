import fetch from "node-fetch";

const url = "http://saguaro-pajitnov.herokuapp.com";

export class Server {
  async createGame(params) {
    const response = await fetch(`${url}/`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {},
    });

    const gameId = response.headers.get("location");
    const gameID = gameId.substring(1);
    return gameID;
  }

  async joinGame(gameId, playerName) {
    const response = await fetch(`${url}/${gameId}/players`, {
      method: "POST",
      body: JSON.stringify({ name: playerName }),
    });
    const data = await response.json();
    const turnToken = response.headers.get("X-Turn-Token");
    const playerId = response.headers.get("X-Player-Id");

    return { turnToken, playerId, data };
  }

  async playerMoves(gameId, xTurnToken, xPlayerId, params) {
    const response = await fetch(`${url}/${gameId}/moves`, {
      method: "POST",
      headers: {
        "X-Turn-Token": xTurnToken,
        "X-Player-Id": xPlayerId,
      },
      body: JSON.stringify(params),
    });
    const statusCode = await response.status;
    // const responseText = await response.text();
    // const x = await response.body();
    // const x = await response.json();
    const a = response.headers.raw();
    console.log(a);
    const turnToken = response.headers.get("X-Turn-Token");
    const playerId = response.headers.get("X-Player-Id");

    let data;
    try {
      for await (const chunk of response.body) {
        data = JSON.parse(chunk.toString());
        console.log(data);
        break;
      }
    } catch (err) {
      console.error(err.stack);
    }

    return { statusCode, turnToken, playerId, data };
  }
}
