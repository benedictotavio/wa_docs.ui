import { createContext } from "react";
import {FolderContextValue} from "./folder.context.interface"

export const FolderContext = createContext<FolderContextValue>({} as FolderContextValue);