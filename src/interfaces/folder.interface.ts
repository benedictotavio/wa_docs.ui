export interface Folder {
  folderId: number;
  folderName: string;
  parentFolderId: number | null;
  projectId: number;
  level: number;
}
