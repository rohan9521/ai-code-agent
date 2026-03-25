import { useAppStore } from "../../store/useAppStore";

export default function FileTree() {
  const plan = useAppStore((s) => s.plan);

  if (!plan) return null;

  return (
    <div style={{ width: "20%", borderRight: "1px solid #ccc" }}>
      <h4>Files</h4>
      {plan.files.map((f) => (
        <div key={f.path}>{f.path}</div>
      ))}
    </div>
  );
}