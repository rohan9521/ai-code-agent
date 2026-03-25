import { Router } from "express";
import { generatePlan } from "../services/agent.service.js";
import {
  createProjectStructure,
  writeFiles
} from "../services/file.service.js";
import { runCommands } from "../services/exce.service.js";

const router = Router();

let currentPlan: any = null;
let projectId = "project-" + Date.now();

// Generate Plan
router.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const plan = await generatePlan(prompt);

    currentPlan = plan;

    res.json(plan);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Confirm & Build
router.post("/confirm", async (_req, res) => {
  try {
    await createProjectStructure(projectId, currentPlan.folders);
    await writeFiles(projectId, currentPlan.files);
    runCommands(projectId, currentPlan.commands);

    res.json({ status: "created", projectId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;