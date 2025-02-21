import { useContext, useState } from "react";
import { Folder } from "../../../interfaces/folder.interface";
import { FolderContext } from "../../../context/folder/folder.context";
import { RequestContext } from "../../../context/request/request.context";
import { Request } from "../../../interfaces/request.interface";
import RequestList from "../Request/list/requestList";

interface FolderInputItemProps {
  folder: Folder;
  marginStart: number;
}

const FolderInputItem: React.FC<FolderInputItemProps> = ({
  folder,
  marginStart = 0,
}) => {
  const [isFolderIconOpen, setIsFolderIconOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.folderName);
  const [requests, setRequests] = useState<Request[]>([]);

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

  return (
    <div
      style={FolderInputStyle}
      className="d-flex flex-column align-items-center gap-2"
    >
      <div className="d-flex flow-row align-items-center justify-content-between">
        <button onClick={getRequestsByFolderId} className="bg-transparent border-0">
          {isFolderIconOpen ? (
            <i className="mx-2">&#128194;</i>
          ) : (
            <i className="mx-2">&#128193;</i>
          )}
        </button>
        <input
          className="w-100 bg-transparent border-0 my-2"
          onBlur={changeFolderName}
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </div>
      {
        isFolderIconOpen && (
          <RequestList requests={requests} />
        )
      }
    </div>
  );
};

export default FolderInputItem;
