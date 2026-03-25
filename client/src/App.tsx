import ChatPanel from "./components/Chat/ChatPanel";
import FileTree from "./components/FileTree/FileTree";
import CodeEditor from "./components/Editor/CodeEditor";
import Terminal from "./components/Terminal/Terminal";
import { useSocket } from "./hooks/useSocket";

export default function App() {
  useSocket();

  return (

    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <FileTree />
        <CodeEditor />
        <ChatPanel />
      </div>
      <Terminal />
    </div>
  );
}