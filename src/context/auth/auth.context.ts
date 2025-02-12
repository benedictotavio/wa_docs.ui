import { createContext } from "react";
import { AuthContextValue } from "./auth.context.interface";

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);