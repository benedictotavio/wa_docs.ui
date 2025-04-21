import { Folder } from "../../interfaces/folder.interface";

export interface NewFolder {
  name: string;
  parentId?: number;
  projectId: number;
  level?: number;
}

export interface FolderContextValue {
  getTree: (projectId: number, parentId?: number) => Promise<Folder[]>;
  createFolder: (newFolder: NewFolder) => Promise<void>;
  updateFolder: (folderId: number, folderName: string) => Promise<void>;
  deleteFolder: (folderId: number) => Promise<void>;
}
