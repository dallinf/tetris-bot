import fetch from "node-fetch";

const url = "http://saguaro-pajitnov.herokuapp.com";

export class Server {
  async createGame(params) {
    const response = await fetch(`${url}/`, {
      method: "POST",
      body: JSON.stringify(params),
      // body: params,
      headers,
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

    const gameId = response.headers;
    console.log(gameId);
    // console.log(data);
  }
}
