import { create } from "zustand";
import { Plan, Message } from "../types/agent.types";

interface AppState {
  messages: Message[];
  plan: Plan | null;
  logs: string[];

  addMessage: (msg: Message) => void;
  setPlan: (plan: Plan) => void;
  addLog: (log: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  messages: [],
  plan: null,
  logs: [],

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg]
    })),

  setPlan: (plan) => set({ plan }),

  addLog: (log) =>
    set((state) => ({
      logs: [...state.logs, log]
    }))
}));