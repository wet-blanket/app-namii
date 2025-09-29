import { z } from "zod";

export const InvitePeopleSchema = z.object({
  inviteCode: z
    .string()
    .length(6, { message: "Please a provide a 6 digit code" })
    .regex(/^\d+$/, { message: "Invite code must contain only numbers" }),
});
