import { Request, RequestMethod } from "../interfaces/request.interface";

export class RequestService {
  public async exeute(request: Request) {
    console.log("Request", request);
    return this.switchMethod(request)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error", error);
        return error;
      });
  }

  private async switchMethod(request: Request) {
    switch (request.method) {
      case RequestMethod.GET:
        return fetch(request.uri, {
          method: request.method,
          headers: JSON.parse(request.headers),
        });
      default:
        return fetch(request.uri, {
          method: request.method,
          body: request.body,
          headers: JSON.parse(request.headers),
        });
    }
  }
}
