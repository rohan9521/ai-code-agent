import Editor from "@monaco-editor/react";
import { useAppStore } from "../../store/useAppStore";
import { useState } from "react";

export default function CodeEditor() {
  const plan = useAppStore((s) => s.plan);
  const [file, setFile] = useState<string | null>(null);

  if (!plan) return null;

  const selected = plan.files.find((f) => f.path === file);

  return (
    <div style={{ width: "50%" }}>
      <select onChange={(e) => setFile(e.target.value)}>
        <option>Select file</option>
        {plan.files.map((f) => (
          <option key={f.path} value={f.path}>
            {f.path}
          </option>
        ))}
      </select>

      <Editor
        height="500px"
        language="javascript"
        value={selected?.content || ""}
      />
    </div>
  );
}