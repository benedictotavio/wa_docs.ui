import { useContext } from "react";
import { FolderContext } from "../../context/folder/folder.context";
import Dropdown from "../../design/dropdown/dropdown";
import FolderTree from "../feature/Folder/folderTree";
import MoreOptions from "./moreOptions";

interface MenuItemProps {
  text: string;
  projectId?: number;
}

const projectItem = (text: string, onClick: (e: React.MouseEvent) => void) => {
  return (
    <div className="d-flex flow-row align-items-center justify-content-between">
      <h5>
        <i className="mx-2">
          &#128423;
        </i>
        {text}
      </h5>
      <MoreOptions>
        <li className="d-flex flow-row align-items-center">
          <button onClick={onClick}>
            <i>+</i> Nova pasta
          </button>
        </li>
        <li>Excluir</li>
      </MoreOptions>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ projectId, text }) => {
  const { createFolder } = useContext(FolderContext);

  const handleClick = (e: React.MouseEvent) => {
    const newFolderName = prompt("Digite o nome da pasta");

    e.preventDefault();
    if (newFolderName) {
      createFolder({
        name: newFolderName,
        projectId: projectId ?? 0,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <li className="w-100 list-group-item">
      <Dropdown trigger={projectItem(text, handleClick)} absolute={false}>
        <FolderTree projectId={projectId ?? 0} />
      </Dropdown>
    </li>
  );
};

export default MenuItem;
