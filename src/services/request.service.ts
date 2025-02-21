import { Request } from "../interfaces/request.interface";

export class RequestService {
  public async exeute(request: Request) {
    return fetch(request.uri, {
      method: request.method,
      body: request.body,
      headers: JSON.parse(request.headers),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
