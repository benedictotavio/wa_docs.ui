import { ReactNode, useMemo } from "react";
import useFolder from "./folder.services";
import { FolderContext } from "./folder.context";

export const FolderProvider = ({ children }: { children: ReactNode }) => {

    const { createSubFolder, getTree} = useFolder();

    const value = useMemo(() => ({
        createSubFolder, getTree
    }), [createSubFolder, getTree])

    return (
        <FolderContext.Provider value={value}>
            {children}
        </FolderContext.Provider>
    );
}