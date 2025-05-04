import { RequestMethod } from "./request.interface";

export interface Mockserver {
  id?: number;
  name: string;
  baseUrl?: string;
  path: string;
  method: RequestMethod;
  body?: string;
  headers: string;
  projectId: number;
  statusCode: number;
  bodyResponse: string;
}
