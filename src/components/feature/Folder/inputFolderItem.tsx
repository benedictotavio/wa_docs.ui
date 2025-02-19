import { useContext, useState } from "react";
import { Folder } from "../../../interfaces/folder.interface";
import { FolderContext } from "../../../context/folder/folder.context";

interface FolderInputItemProps {
  folder: Folder;
  marginStart: number;
}

const FolderInputItem: React.FC<FolderInputItemProps> = ({
  folder,
  marginStart = 0,
}) => {
  const [newFolderName, setNewFolderName] = useState(folder.folderName);

  const FolderInputStyle: React.CSSProperties = {
    marginLeft: `${folder.parentFolderId !== null ? marginStart : 0}px`,
  };

  const { updateFolder } = useContext(FolderContext);

  const changeFolderName = () => {
    if (
      newFolderName !== folder.folderName &&
      newFolderName !== "" &&
      newFolderName.trim().length > 3
    ) {
      updateFolder(folder.folderId, newFolderName);
    }
  };

  return (
    <div style={FolderInputStyle} className="d-flex flex-row align-items-center gap-2">
      <i className="mx-2">&#128193;</i>
      <input
        className="w-100 bg-transparent border-0 my-2"
        onBlur={changeFolderName}
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
    </div>
  );
};

export default FolderInputItem;
