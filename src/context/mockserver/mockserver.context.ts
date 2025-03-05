import { createContext } from "react";
import { MockserverContextValue } from "./mockserver.context.interface";

export const MockserverContext = createContext<MockserverContextValue>({} as MockserverContextValue);