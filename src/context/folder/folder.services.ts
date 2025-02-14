import _fetch from "../utils/fetch";

const useFolder = () => {
  const getTree = async (projectId: number, parentId: number) => {
    const response = await _fetch(`/folder/tree/${projectId}/${parentId}`);
    return response.data;
  };

  const createSubFolder = async (folderName: string): Promise<void> => {
    await _fetch(`/folder/folder`, {
      method: "POST",
      body: JSON.stringify({
        name: folderName,
      }),
    });
  };

  return {
    getTree,
    createSubFolder,
  };
};

export default useFolder;
