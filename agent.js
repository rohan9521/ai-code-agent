import ollama from "ollama";
import fs from "fs-extra";
import simpleGit from "simple-git";
import { execSync } from "child_process";

const git = simpleGit();

async function runAgent() {

  const userPrompt = process.argv.slice(2).join(" ");

  if (!userPrompt) {
    console.log("Usage: node agent.js \"create a node express api\"");
    process.exit(1);
  }

  const systemPrompt = `
You are a software engineer AI.

Generate a project.

Return ONLY valid JSON.

Format:

{
  "repo": "project-name",
  "folders": ["src","src/routes"],
  "files": [
    {
      "path": "src/index.js",
      "content": "code here"
    }
  ],
  "commands": ["npm init -y", "npm install express"]
}

Rules:
- No explanations
- No markdown
- Only JSON
`;

  const plan = await generatePlan(systemPrompt, userPrompt);

  await buildProject(plan);
}

async function generatePlan(systemPrompt, userPrompt) {

  for (let attempt = 1; attempt <= 3; attempt++) {

    try {

      const response = await ollama.chat({
        model: "qwen2.5-coder",
        format: "json",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      });

      const text = response.message.content;

      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error("No JSON found");
      }

      const plan = JSON.parse(jsonMatch[0]);

      return plan;

    } catch (err) {

      console.log(`Attempt ${attempt} failed. Retrying...`);

      if (attempt === 3) {
        throw err;
      }
    }
  }
}

async function buildProject(plan) {

  console.log("Creating repo:", plan.repo);

  await fs.mkdir(plan.repo, { recursive: true });

  process.chdir(plan.repo);

  await git.init();

  if (plan.folders) {
    for (const folder of plan.folders) {
      await fs.mkdir(folder, { recursive: true });
    }
  }

  if (plan.files) {
    for (const file of plan.files) {
      await fs.outputFile(file.path, file.content);
    }
  }

  if (plan.commands) {
    for (const cmd of plan.commands) {
      console.log("Running:", cmd);
      execSync(cmd, { stdio: "inherit" });
    }
  }

  await git.add(".");
  await git.commit("Initial commit by AI agent");

  console.log("Project created successfully!");
}

runAgent();