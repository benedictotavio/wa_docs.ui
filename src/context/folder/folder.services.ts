import _fetch from "../utils/fetch";

const useFolder = () => {
  const getTree = async (projectId: number, parentId: number) => {
    const response = await _fetch(`/folder/tree/${projectId}/${parentId}`);
    return response;
  };

  const createSubFolder = async (folderName: string, parentId: number, projectId: number) => {
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

  return {
    getTree,
    createSubFolder,
  };
};

export default useFolder;
