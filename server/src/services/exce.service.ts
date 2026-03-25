import { spawn } from "child_process";
import { getWorkspace } from "../utils/workspace.js";
import { io } from "../index.js";

export function runCommands(projectId: string, commands: string[]) {
  const cwd = getWorkspace(projectId);

  for (const cmd of commands) {
    const [command, ...args] = cmd.split(" ");

    const child = spawn(command, args, { cwd });

    child.stdout.on("data", (data) => {
      io.emit("log", data.toString());
    });

    child.stderr.on("data", (data) => {
      io.emit("log", data.toString());
    });
  }
}