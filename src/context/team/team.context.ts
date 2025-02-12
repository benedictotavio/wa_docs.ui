import { createContext } from "react";
import { TeamContextValue } from "./team.context.interface";

export const TeamContext = createContext<TeamContextValue>({} as TeamContextValue);