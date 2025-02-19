import { Folder } from "../../interfaces/folder.interface";
import _fetch from "../utils/fetch";
import { NewFolder } from "./folder.context.interface";

const useFolder = () => {
  const getTree = async (
    projectId: number,
    parentId?: number
  ): Promise<Folder[]> => {
    if (parentId) {
      const response = await _fetch(
        `/folder/tree?projectId=${projectId}&parentId=${parentId}`, {
          method: "GET",
          includeCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      return response;
    }

    const response = await _fetch(`/folder/tree?projectId=${projectId}`, {
      method: "GET",
      includeCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    });
    console.log(response);
    return response;
  };

  const createSubFolder = async (
    folderName: string,
    parentId: number,
    projectId: number
  ) => {
    await _fetch(`/folder/subfolder`, {
      method: "POST",
      body: JSON.stringify({
        name: folderName,
        parentId,
        projectId,
      }),
      includeCredentials: true,
    });
  };

  const createFolder = async (newFolder: NewFolder) => {
    await _fetch(`/folder`, {
      method: "POST",
      body: JSON.stringify({
        name: newFolder.name,
        parentId: newFolder.parentId,
        projectId: newFolder.projectId,
        level: newFolder.level,
      }),
      includeCredentials: true,
    });
  };

  const updateFolder = async (folderId: number, folderName: string) => {
    await _fetch(`/folder/${folderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: folderName,
      }),
      includeCredentials: true,
    });
  };

  const deleteFolder = async (folderId: number) => {
    await _fetch(`/folder/${folderId}`, {
      method: "DELETE",
      includeCredentials: true,
    });
  };

  return {
    getTree,
    createSubFolder,
    createFolder,
    updateFolder,
    deleteFolder,
  };
};

export default useFolder;
