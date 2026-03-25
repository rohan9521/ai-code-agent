import { useState } from "react";
import { generatePlan, confirmPlan } from "../../api/agent.api";
import { useAppStore } from "../../store/useAppStore";

export default function ChatPanel() {
  const [input, setInput] = useState("");

  const { messages, addMessage, setPlan, plan } = useAppStore();

  const handleSend = async () => {
    addMessage({ role: "user", content: input });

    const plan = await generatePlan(input);

    setPlan(plan);

    addMessage({
      role: "assistant",
      content: JSON.stringify(plan, null, 2)
    });

    setInput("");
  };

  const handleConfirm = async () => {
    await confirmPlan();
    alert("Project Created 🚀");
  };

  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>

      {plan && <button onClick={handleConfirm}>Confirm Plan</button>}
    </div>
  );
}