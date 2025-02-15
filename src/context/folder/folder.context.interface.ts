export interface FolderContextValue {
  createSubFolder: (
    folderName: string,
    projectId: number,
    parentId?: number
  ) => Promise<void>;
  getTree: (projectId: number, parentId: number) => Promise<void>;
}
