import { z } from "zod";

export const OnboardingSchema = z.object({
  fullName: z.string().min(1, "Your name is required"),
  username: z
    .string()
    .min(3, "Username must be atleast 3 characters long")
    .regex(/^[A-Za-z]+$/, "Username can only contain letters"),
});

export const VerifyCodeSchema = z.object({
  verificationCode: z
    .string()
    .min(6, "Please enter your 6 digit verification code"),
});
