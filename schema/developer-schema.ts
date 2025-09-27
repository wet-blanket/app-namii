import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z.string().min(3, "Provide a valid organization name"),
  description: z.string(),
});
