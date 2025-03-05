export interface Mockserver {
  id?: number;
  name: string;
  url?: string;
  path: string;
  method: string;
  body?: string;
  headers: string;
  projectId: number;
  statusCode: number;
  bodyResponse: string;
}
