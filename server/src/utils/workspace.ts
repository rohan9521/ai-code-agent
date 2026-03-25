import path from "path";

export function getWorkspace(projectId: string) {
  return path.join(process.cwd(), "workspaces", projectId);
}