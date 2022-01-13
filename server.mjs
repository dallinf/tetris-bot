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
    console.log(gameID);
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
    // console.log(
    //   `gameId: ${gameId} - turn: ${xTurnToken} - player - ${xPlayerId}`
    // );
    // console.log(params);
    const response = await fetch(`${url}/${gameId}/moves`, {
      method: "POST",
      headers: {
        "X-Turn-Token": xTurnToken,
        "X-Player-Id": xPlayerId,
      },
      body: JSON.stringify(params),
    });
    const statusCode = await response.status;
    const turnToken = response.headers.get("X-Turn-Token");
    const playerId = response.headers.get("X-Player-Id");

    let data;
    if (statusCode === 200) {
      try {
        let body = "";
        for await (const chunk of response.body) {
          body += chunk.toString();
        }

        data = JSON.parse(body);
      } catch (err) {
        console.error(err.stack);
      }
    }

    return { statusCode, turnToken, playerId, data };
  }
}
