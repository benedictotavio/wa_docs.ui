import { createContext } from "react";
import { UserContextValue } from "./users.context.interface";

export const UserContext = createContext<UserContextValue>({} as UserContextValue);