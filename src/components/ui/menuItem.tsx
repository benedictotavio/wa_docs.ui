import { useContext, useState } from "react";
import { Folder } from "../../interfaces/folder.interface";
import { FolderContext } from "../../context/folder/folder.context";
import Dropdown from "../../design/dropdown/dropdown";
import List from "./lists/list";

interface MenuItemProps {
  text: string;
  folders?: Folder[];
  projectId?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, folders, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputNewFolder, setIsInputNewFolder] = useState(false);

  const [newFolderName, setNewFolderName] = useState("");

  const { createSubFolder } = useContext(FolderContext);

  const createNewFolder = (parentId?: number) => {
    if (newFolderName === "") {
      alert("Por favor, insira um nome para a pasta");
      return;
    }

    if (newFolderName.length > 20) {
      alert("O nome da pasta não pode ter mais de 20 caracteres");
      return;
    }

    createSubFolder(newFolderName, projectId!, parentId);
    setIsInputNewFolder(false);
    setNewFolderName("");
  };

  const renderFormToNewFolder = (folderId?: number) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNewFolder(folderId ?? 1);
        }}
        className="d-flex flex-row justify-content-center align-items-center gap-2"
      >
        <input
          type="text"
          className="form-control"
          placeholder="Nome da pasta"
          onChange={(e) => setNewFolderName(e.target.value)}
          value={newFolderName}
        />
        {newFolderName.length > 3 && (
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => createNewFolder(folderId ?? 1)}
          >
            Criar
          </button>
        )}
      </form>
    );
  };

  const renderMoreOptions = () => {
    return (
      <Dropdown
        trigger={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots-vertical m-0 p-0"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        }
      >
        <List>
          <li>
            <button
              className="btn btn-primary bg-transparent border-0 text-dark"
              onClick={() => setIsInputNewFolder(!isInputNewFolder)}
            >
              <span>Criar pasta</span>
            </button>
          </li>
        </List>
      </Dropdown>
    )
  }

  const renderTree = () => {
    return (
      <ul className="list-group list-group-flush">
        {folders?.map((folder) => (
          <li key={folder.folderId} className="list-group-item border-0 d-flex flex-row justify-content-between align-items-center px-0 m-0">
            <div className="d-flex flex-row justify-content-evenly align-items-center gap-2">
              <span>{folder.folderName}</span>
              {renderMoreOptions()}
            </div>
            {isInputNewFolder && renderFormToNewFolder(folder.folderId)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <li className="list-group-item border-0 d-flex flex-row justify-content-between align-items-center px-0 m-0">
      <Dropdown
        onClick={() => setIsOpen(!isOpen)}
        trigger={
          <div className="d-flex flex-row justify-content-start align-items-center gap-2">
            <i className="d-flex justify-content-end align-items-end px-2">
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-down"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-right"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                </svg>
              )}
            </i>
            <h6 className="text-dark mb-0">{text}</h6>
          </div>
        }
      >
        {folders!.length > 0 ? (
          renderTree()
        ) : (
          <>
            <button onClick={() => setIsInputNewFolder(true)}>
              + Criar nova pasta
            </button>
            {isInputNewFolder && renderFormToNewFolder()}
          </>
        )}
      </Dropdown>

      {renderMoreOptions()}
    </li>
  );
};

export default MenuItem;
