import { useContext, useMemo, useState } from "react";
import { FolderContext } from "../../../context/folder/folder.context";
import { Folder } from "../../../interfaces/folder.interface";
import FolderInputItem from "./inputFolderItem";
import MoreOptions from "../../ui/moreOptions";
import Modal from "../../../design/modal/Modal";
import FormRequest from "../Request/form";

interface FolderTreeProps {
  projectId: number;
}

const FolderTree: React.FC<FolderTreeProps> = ({ projectId }) => {
  const { getTree, createFolder, deleteFolder } = useContext(FolderContext);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useMemo(() => {
    getTree(projectId).then((folders) => {
      setFolders(folders);
    });
  }, [getTree, projectId]);

  const addFolder = (folderId: number, level: number) => {
    const newFolderName = prompt("Digite o nome da pasta");

    if (newFolderName) {
      createFolder({
        name: newFolderName,
        parentId: folderId,
        projectId,
        level: level + 1,
      });

      setFolders((prevFolders) => {
        const updatedFolders = prevFolders.map((folder) => {
          if (folder.folderId === folderId) {
            return {
              ...folder,
              folderName: newFolderName,
            };
          }
          return folder;
        });
        return updatedFolders;
      });
    }
  };

  const removeFolder = (folderId: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta pasta?"
    );
    if (confirmDelete) {
      deleteFolder(folderId)
        .then(() => {
          setFolders((prevFolders) =>
            prevFolders.filter((folder) => folder.folderId !== folderId)
          );
        })
        .catch((error) => {
          console.error("Erro ao excluir a pasta:", error);
        });
    }
  };

  return (
    <div>
      {folders.map((folder: Folder) => (
        <div
          key={folder.folderId}
          className="d-flex flow-row align-items-center justify-content-between"
        >
          <FolderInputItem folder={folder} marginStart={20} />
          <MoreOptions key={folder.folderId}>
            <li className={`d-flex flow-row align-items-center`}>
              <button onClick={() => addFolder(folder.folderId, folder.level)}>
                <i>+</i> Nova pasta
              </button>
            </li>
            <li>
              <button onClick={() => removeFolder(folder.folderId)}>
                Excluit
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setIsRequestModalOpen(true)}>
                <i>+</i> Criar requisição
              </button>
              <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)}>
                <FormRequest folderId={folder.folderId} />
              </Modal>
            </li>
          </MoreOptions>
        </div>
      ))}
    </div>
  );
};

export default FolderTree;
