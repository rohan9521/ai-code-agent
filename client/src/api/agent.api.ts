import axios from "axios";
import { Plan } from "../types/agent.types";

const API = "http://localhost:3000/agent";

export const generatePlan = async (prompt: string) => {
  const res = await axios.post<Plan>(`${API}/generate`, { prompt });
  return res.data;
};

export const confirmPlan = async () => {
  const res = await axios.post(`${API}/confirm`);
  return res.data;
};