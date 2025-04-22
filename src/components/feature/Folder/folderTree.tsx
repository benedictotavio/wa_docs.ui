import { useContext, useMemo, useState } from "react";
import { FolderContext } from "../../../context/folder/folder.context";
import { Folder } from "../../../interfaces/folder.interface";
import FolderInputItem from "./inputFolderItem";
import Button from "../../../design/button/button";

interface FolderTreeProps {
  projectId: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({ projectId }) => {
  const { getTree } = useContext(FolderContext);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useMemo(() => {
    getTree(projectId).then((folders) => {
      setFolders(folders);
    });
  }, [getTree, projectId]);

  return (
    <div>
      {folders.length > 0 ? (
        folders.map((folder: Folder) => (
          <FolderInputItem
            folder={folder}
            marginStart={folder.level * 10}
            key={folder.folderId}
          />
        ))
      ) : (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>+ Adicionar pasta</Button>
          {isOpen && (
            <div className="d-flex flex-column">
              <input
                type="text"
                placeholder="Nome da pasta"
                className="w-100"
              />
              <Button>Adicionar</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FolderTree;
