import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export const RegisterSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });
