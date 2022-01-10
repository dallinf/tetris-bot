import fetch from "node-fetch";

const url = "http://saguaro-pajitnov.herokuapp.com";

export class Server {
  async createGame(params) {
    const response = await fetch(`${url}/`, {
      method: "POST",
      body: JSON.stringify(params),
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

    const xTurnToken = response.headers.get("X-Turn-Token");
    const xPlayerId = response.headers.get("X-Player-Id");
    return { xTurnToken, xPlayerId };
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
    const responseText = await response.text();

    return { statusCode, responseText };
  }
}
