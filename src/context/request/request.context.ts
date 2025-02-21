import { createContext } from "react";
import { RequestContextValue } from "./request.context.interface";

export const RequestContext = createContext<RequestContextValue>({} as RequestContextValue);
