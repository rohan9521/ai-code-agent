import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAppStore } from "../store/useAppStore";

export function useSocket() {
  const addLog = useAppStore((s) => s.addLog);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("log", (data: string) => {
      addLog(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
}