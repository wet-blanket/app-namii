import { z } from "zod";

export const OnboardingSchema = z.object({
  fullName: z.string().min(1, "Your name is required"),
  userName: z
    .string()
    .min(3, "Alias must be atleast 3 characters long")
    .regex(/^[A-Za-z0-9]+$/, "Alias can only contain letters and numbers"),
});

export const VerifyCodeSchema = z.object({
  verificationCode: z
    .string()
    .min(6, "Please enter your 6 digit verification code"),
});
