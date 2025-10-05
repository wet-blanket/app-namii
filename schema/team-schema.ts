import { z } from "zod";

export const CreateTeamSchema = z.object({
  name: z.string().min(1, "Please provide a proper team name."),
  description: z.string(),
});
