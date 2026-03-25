import { z } from "zod";

export const PlanSchema = z.object({
  repo: z.string(),
  folders: z.array(z.string()),
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string()
    })
  ),
  commands: z.array(z.string())
});

export type Plan = z.infer<typeof PlanSchema>;