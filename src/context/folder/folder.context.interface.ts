export interface FolderContextValue {
  createSubFolder: (folderName: string) => void;
  getTree: (projectId: number, parentId: number) => Promise<void>;
}
