import { ReactNode, useMemo } from "react";
import useFolder from "./folder.services";
import { FolderContext } from "./folder.context";

export const FolderProvider = ({ children }: { children: ReactNode }) => {
  const { createSubFolder, getTree, createFolder, updateFolder, deleteFolder } = useFolder();

  const value = useMemo(
    () => ({
      createSubFolder,
      getTree,
      createFolder,
      updateFolder,
      deleteFolder
    }),
    [createSubFolder, getTree, createFolder, updateFolder, deleteFolder]
  );

  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  );
};
