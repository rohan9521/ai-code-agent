import { useAppStore } from "../../store/useAppStore";

export default function Terminal() {
  const logs = useAppStore((s) => s.logs);

  return (
    <div style={{ height: "200px", background: "black", color: "green", overflow: "auto" }}>
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}