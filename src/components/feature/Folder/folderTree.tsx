import { useContext, useMemo, useState } from "react";
import { FolderContext } from "../../../context/folder/folder.context";
import { Folder } from "../../../interfaces/folder.interface";
import FolderInputItem from "./inputFolderItem";
import Button from "../../../design/button/Button";
import HtmlIcon from "../../../design/icon/htmlIcon/HtmlIcon";
import Modal from "../../../design/modal/Modal";
import NewFolderForm from "./newFolderForm";

interface FolderTreeProps {
  projectId: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({ projectId }) => {
  const { getTree } = useContext(FolderContext);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const reduceFolders = (folders: Folder[]): Folder[] => {
    const reducedFolders: Folder[] = [];
    folders.forEach((folder) => {
      if (folder.parentFolderId === null) {
        reducedFolders.push(folder);
      }
    });
    return reducedFolders;
  };

  useMemo(() => {
    getTree(projectId).then((folders) => {
      setFolders(folders);
    });
  }, [getTree, projectId]);

  return (
    <div>
      {folders.length > 0 ? (
        <div>
          {reduceFolders(folders).map((folder) => (
            <FolderInputItem
              key={folder.folderId}
              folder={folder}
              marginStart={folder.level * 1}
            />
          ))}
        </div>
      ) : (
        <>
          {projectId > 0 && (
            <Button onClick={() => setIsOpen(!isOpen)}>
              <HtmlIcon hex="&oplus;" />
              Adicionar pasta
            </Button>
          )}
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            isCenter
            title="Nova pasta"
          >
            <NewFolderForm projectId={projectId} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default FolderTree;
