import { Request } from "../../interfaces/request.interface";

export interface RequestContextValue {
  currentRequest: Request | null;
  changeCurrentRequest: (request: Request | number) => void;
  loading: boolean;
  addRequest: (request: Request) => void;
  updateRequest: (request: Request) => void;
  deleteRequest: (requestId: number) => void;
  getRequestByFolderId: (folderId: number) => Promise<Request[]>;
  getRequestById: (requestId: number) => Promise<Request | undefined>;
}
