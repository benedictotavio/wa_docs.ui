import { ReactNode, useMemo } from "react";
import useFolder from "./folder.services";
import { FolderContext } from "./folder.context";

export const FolderProvider = ({ children }: { children: ReactNode }) => {
  const { getTree, createFolder, updateFolder, deleteFolder } = useFolder();

  const value = useMemo(
    () => ({
      getTree,
      createFolder,
      updateFolder,
      deleteFolder,
    }),
    [getTree, createFolder, updateFolder, deleteFolder]
  );

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
