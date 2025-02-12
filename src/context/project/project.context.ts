import { createContext } from "react";
import {ProjectContextValue} from "./project.context.interface"

export const ProjectContext = createContext<ProjectContextValue>({} as ProjectContextValue);