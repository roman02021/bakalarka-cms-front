export interface File {
  id: number;
  name: string;
  parentFolder: number;
  absolutePath: string;
}
export interface Folder {
  id: number;
  name: string;
  parentFolder: number;
  absolutePath: string;
}

export interface FolderContent {
  folders: Folder[];
  files: File[];
}
