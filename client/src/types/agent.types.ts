export interface FileItem {
  path: string;
  content: string;
}

export interface Plan {
  repo: string;
  folders: string[];
  files: FileItem[];
  commands: string[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}