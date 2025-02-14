import { useContext, useState } from "react";
import { Folder } from "../../interfaces/folder.interface";
import { FolderContext } from "../../context/folder/folder.context";

interface MenuItemProps {
  text: string;
  folders?: Folder[];
}

const MenuItem: React.FC<MenuItemProps> = ({ text, folders }) => {

  const [isOpen, setIsOpen] = useState(false);

  const {createSubFolder, getTree} = useContext(FolderContext);

  return (
    <li className="list-group-item border-0">
      <button className="d-flex justify-content-center align-items-center gap-2 bg-transparent border-0" onClick={() => setIsOpen(!isOpen)}>
        <i className="d-flex justify-content-end align-items-end px-2">
          {
            isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
              </svg>
            )
          }
        </i>
        <h6 className="text-dark mb-0">{text}</h6>
      </button>
      {isOpen && folders!.length > 0 && (
        <ul>
          {folders!.map((folder) => (
            <li key={folder.folderId} className="list-group-item border-0">
              <span>{folder.folderName}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
