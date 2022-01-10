import fetch from "node-fetch";

const url = "https://saguaro-pajitnov.herokuapp.com:443";

export class Server {
  async post(path, params, headers) {
    console.log(params);
    const response = await fetch(`${url}${path}`, {
      method: "POST",
      body: JSON.stringify(params),
      // body: params,
      headers,
    });
    const data = await response.json();

    console.log(data);
  }
}
