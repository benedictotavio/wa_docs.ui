export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  HEAD = "HEAD",
  PATCH = "PATCH",
}


export interface Request {
  id?: number;
  name?: string;
  uri: string;
  body: string;
  method: RequestMethod;
  headers: string;
  folderId?: number;
}
