import fetch from "node-fetch";

const url = "https://saguaro-pajitnov.herokuapp.com:443";

export class Server {
  async post(path, params) {
    const response = await fetch(`${url}${path}`, {
      method: "POST",
      body: JSON.stringify(params),
    });
    const data = await response.json();

    console.log(data);
  }
}