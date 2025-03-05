import { Mockserver } from "../../interfaces/mockserver.interface";
import { Request } from "../../interfaces/request.interface";

export interface MockserverContextValue {
  getMockserversByProjectId: (projectId: number) => Promise<Mockserver[]>;
  createMockServer: (mockServer: Mockserver) => Promise<void>;
  getMockServerById: (id: number, asRequest?: boolean) => Promise<Mockserver | Request>;
}
