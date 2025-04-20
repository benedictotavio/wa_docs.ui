import { useContext, useMemo, useState } from "react";
import { FolderContext } from "../../../context/folder/folder.context";
import { Folder } from "../../../interfaces/folder.interface";
import FolderInputItem from "./inputFolderItem";

interface FolderTreeProps {
  projectId: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({ projectId }) => {
  const { getTree } = useContext(FolderContext);

  const [folders, setFolders] = useState<Folder[]>([]);

  useMemo(() => {
    getTree(projectId).then((folders) => {
      setFolders(folders);
    });
  }, [getTree, projectId]);

  return (
    <div>
      {folders.map((folder: Folder) => (
        <FolderInputItem
          folder={folder}
          marginStart={20}
          key={folder.folderId}
        />
      ))}
    </div>
  );
};

export default FolderTree;
