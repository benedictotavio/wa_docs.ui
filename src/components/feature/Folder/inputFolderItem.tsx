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
import HtmlIcon from "../../../design/icon/htmlIcon/HtmlIcon";
import ListItem from "../../../design/list/ListItem";
import Button from "../../../design/button/Button";

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
  const [childFolders, setChildFolders] = useState<Folder[]>([]);

  const { createFolder, deleteFolder } = useContext(FolderContext);
  const { currentProject } = useContext(ProjectContext);
  const { updateFolder, getTree } = useContext(FolderContext);
  const { getRequestByFolderId } = useContext(RequestContext);

  const FolderInputStyle: React.CSSProperties = {
    marginLeft: `${folder.parentFolderId !== null ? marginStart : 0}px`,
  };

  const changeFolderName = () => {
    if (
      newFolderName !== folder.folderName &&
      newFolderName !== "" &&
      newFolderName.trim().length > 3
    ) {
      updateFolder(folder.folderId, newFolderName);
      folder.folderName = newFolderName;
    }
  };

  const getRequestsByFolderId = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFolderIconOpen(!isFolderIconOpen);
    if (!isFolderIconOpen) {
      getTree(currentProject?.id ?? 0, folder.folderId).then((folders) => {
        setChildFolders(folders);
      });
      getRequestByFolderId(folder.folderId).then((requests) => {
        setRequests(requests);
      });
    }
  };

  const addFolder = (folderId: number, level: number) => {
    const newFolderName = prompt("Digite o nome da pasta");
    
    if (newFolderName !== null && newFolderName.trim().length > 3) {
      createFolder({
        name: newFolderName,
        parentId: folderId,
        projectId: currentProject?.id ?? 0,
        level: level + 1,
      });
<<<<<<< HEAD
=======

      // window.location.reload();
>>>>>>> c7317b5 (feat: add level in model folder)
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
<<<<<<< HEAD
    <div style={FolderInputStyle} className="d-flex flex-column gap-2 my-2">
      <div className="row">
        <div className="col-9 p-0">
=======
    <div
      style={FolderInputStyle}
      className="d-flex flex-column align-items-center gap-2 my-2"
    >
      <div className="row w-100 d-flex justify-content-between align-items-center">
        <div className="col-9 d-flex align-items-center">
>>>>>>> c7317b5 (feat: add level in model folder)
          <button
            onClick={getRequestsByFolderId}
            className="bg-transparent border-0"
          >
            {isFolderIconOpen ? (
              <HtmlIcon hex="&#128194;" size={20.5} />
            ) : (
              <HtmlIcon hex="&#128193;" size={20} />
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

                if (e.key === "Escape") {
                  setIsInputOpen(false);
                }

                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  const nextInput = document.activeElement?.nextElementSibling;
                  if (nextInput instanceof HTMLInputElement) {
                    nextInput.focus();
                  }
                }

                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  const previousInput = document.activeElement?.previousElementSibling;
                  if (previousInput instanceof HTMLInputElement) {
                    previousInput.focus();
                  }
                }
              }}
              onDoubleClick={(e) => {
                setIsInputOpen(true);
                e.stopPropagation();
              }}
            />
          ) : (
            <Button
              onDoubleClick={(e) => {
                setIsInputOpen(true);
                e.stopPropagation();
              }}
              onClick={getRequestsByFolderId}
              className="bg-transparent border-0 bg-transparent text-decoration-none"
            >
              {folder.folderName}
            </Button>
          )}
        </div>

<<<<<<< HEAD
        <div className="col-2 p-0">
          <MoreOptions key={folder.folderId} isOpen={isFolderIconOpen}>
            <ListItem className="p-0 m-0">
              <Button onClick={() => addFolder(folder.folderId, folder.level)}>
                Nova pasta
              </Button>
            </ListItem>
            <ListItem className="p-0 m-0">
              <Button onClick={() => removeFolder(folder.folderId)}>
=======
        <div className="col-2">
          <MoreOptions key={folder.folderId}>
            <li className={`d-flex flow-row align-items-center`}>
              <button
                onClick={() => {
                  console.log("Folder", folder);
                  addFolder(folder.folderId, folder.level);
                }}
              >
                <i>+</i> Nova pasta
              </button>
            </li>
            <li>
              <button onClick={() => removeFolder(folder.folderId)}>
>>>>>>> c7317b5 (feat: add level in model folder)
                Excluir
              </Button>
            </ListItem>
            <ListItem className="p-0 m-0">
              <Button type="button" onClick={() => setIsRequestModalOpen(true)}>
                <i>+</i> Criar requisição
              </Button>
            </ListItem>
            <ListItem className="p-0 m-0">
              <Button type="button" onClick={() => setIsInputOpen(true)}>
                Renomear
              </Button>
            </ListItem>
          </MoreOptions>
        </div>
      </div>

      {isFolderIconOpen && (
        <ul className="d-flex flex-column w-100 p-0 pl-1 gap-1">
          {childFolders.length > 0 &&
            childFolders?.map((childFolder) => (
              <li key={childFolder.folderId} className="d-flex flex-column">
                <FolderInputItem
                  folder={childFolder}
                  marginStart={folder.level * 7.5}
                />
              </li>
            ))}
        </ul>
      )}

      {isFolderIconOpen && <RequestList requests={requests} />}

      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        isCenter
      >
        <FormRequest folderId={folder.folderId} />
      </Modal>
    </div>
  );
};

export default FolderInputItem;
