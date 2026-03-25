import ollama from "ollama";
import { PlanSchema, Plan } from "../schemas/plan.schema.js";
const SYSTEM_PROMPT = `
You are a software engineer AI.

Return ONLY valid JSON.

STRICT FORMAT:

{
  "repo": "project-name",
  "folders": ["src", "src/routes"],
  "files": [
    {
      "path": "src/index.js",
      "content": "console.log('hello');"
    }
  ],
  "commands": ["npm init -y"]
}

RULES:
- "files" MUST be an array of objects
- Each file MUST have:
  - "path" (string)
  - "content" (string)
- DO NOT return strings in files array
- DO NOT return markdown
- DO NOT return explanation
- ONLY JSON
`;

export async function generatePlan(prompt: string): Promise<Plan> {
  const response = await ollama.chat({
    model: "qwen2.5-coder",
    format: "json",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt }
    ]
  });

  const parsed = JSON.parse(response.message.content);

  return PlanSchema.parse(parsed);
}