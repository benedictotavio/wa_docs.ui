import { useContext, useState } from "react";
import { Folder } from "../../../interfaces/folder.interface";
import { FolderContext } from "../../../context/folder/folder.context";
import { RequestContext } from "../../../context/request/request.context";
import { Request } from "../../../interfaces/request.interface";
import RequestList from "../Request/list/requestList";
import { ProjectContext } from "../../../context/project/project.context";
import Modal from "../../../design/modal/Modal";
import MoreOptions from "../../ui/moreOptions";
import FormRequest from "../Request/form/FormRequest";

interface FolderInputItemProps {
  folder: Folder;
  marginStart: number;
}

const FolderInputItem: React.FC<FolderInputItemProps> = ({
  folder,
  marginStart = 0,
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isFolderIconOpen, setIsFolderIconOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.folderName);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const { createFolder, deleteFolder } = useContext(FolderContext);
  const { currentProject } = useContext(ProjectContext);

  const FolderInputStyle: React.CSSProperties = {
    marginLeft: `${folder.parentFolderId !== null ? marginStart : 0}px`,
  };

  const { updateFolder } = useContext(FolderContext);
  const { getRequestByFolderId } = useContext(RequestContext);

  const changeFolderName = () => {
    if (
      newFolderName !== folder.folderName &&
      newFolderName !== "" &&
      newFolderName.trim().length > 3
    ) {
      updateFolder(folder.folderId, newFolderName);
    }
  };

  const getRequestsByFolderId = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFolderIconOpen(!isFolderIconOpen);
    if (!isFolderIconOpen) {
      getRequestByFolderId(folder.folderId).then((requests) => {
        setRequests(requests);
      });
    }
  };

  const addFolder = (folderId: number, level: number) => {
    const newFolderName = prompt("Digite o nome da pasta");

    if (newFolderName) {
      createFolder({
        name: newFolderName,
        parentId: folderId,
        projectId: currentProject?.id ?? 0,
        level: level + 1,
      });

      window.location.reload();
    }
  };

  const removeFolder = (folderId: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta pasta?"
    );
    if (confirmDelete) {
      deleteFolder(folderId)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Erro ao excluir a pasta:", error);
        });
    }
  };

  return (
    <div
      style={FolderInputStyle}
      className="d-flex flex-column align-items-center gap-2 my-2"
    >
      <div className="row w-100 d-flex justify-content-between align-items-center">

        <div className="col-9 d-flex align-items-center">
          <button
            onClick={getRequestsByFolderId}
            className="bg-transparent border-0"
          >
            {isFolderIconOpen ? (
              <i className="mx-2">&#128194;</i>
            ) : (
              <i className="mx-2">&#128193;</i>
            )}
          </button>
          {isInputOpen ? (
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onBlur={() => {
                changeFolderName();
                setIsInputOpen(false);
              }}
              className="w-100"
              autoFocus
              onClick={() => {
                setIsFolderIconOpen(!isFolderIconOpen);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changeFolderName();
                  setIsInputOpen(false);
                }
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsInputOpen(false);
              }}
            />
          ) : (
            <button
              onClick={() => setIsInputOpen(true)}
              className="bg-transparent border-0"
            >
              {folder.folderName}
            </button>
          )}
        </div>

        <div className="col-2">
          <MoreOptions key={folder.folderId}>
            <li className={`d-flex flow-row align-items-center`}>
              <button onClick={() => addFolder(folder.folderId, folder.level)}>
                <i>+</i> Nova pasta
              </button>
            </li>
            <li>
              <button onClick={() => removeFolder(folder.folderId)}>
                Excluir
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setIsRequestModalOpen(true)}>
                <i>+</i> Criar requisição
              </button>
              <Modal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                isCenter
              >
                <FormRequest folderId={folder.folderId} />
              </Modal>
            </li>
          </MoreOptions>
        </div>
      </div>
      {isFolderIconOpen && <RequestList requests={requests} />}
    </div>
  );
};

export default FolderInputItem;
