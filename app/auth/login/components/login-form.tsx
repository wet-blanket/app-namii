"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/auth-schema";
import { signIn } from "@/utils/auth/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (authData: z.infer<typeof LoginSchema>) => {
    try {
      setIsLoading(true);
      const result = await signIn(authData);

      if (result.error) {
        showError(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Something went wrong:", error);
      showError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  function showError(message: string) {
    setFormError(message);
    setTimeout(() => setFormError(null), 5000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formError && (
          <div className="bg-destructive/20 rounded-md p-4 mb-4">
            <div className="text-destructive text-sm">{formError}</div>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  placeholder="email@example.com"
                  {...field}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    tabIndex={-1}
                  >
                    {!showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <Link
                    href="/auth/forgot-password"
                    className="text-muted-foreground absolute -top-[26px] right-0 text-sm font-medium hover:text-primary"
                    tabIndex={2}
                  >
                    Forgot password?
                  </Link>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: finalize if still needs to watch the form and disable the button */}
        <Button
          type="submit"
          className="w-full bg-primary"
          disabled={
            isLoading
            // !form.watch("email")?.trim() ||
            // !form.watch("password")?.trim()
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </div>
          ) : (
            "Continue"
          )}
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            or
          </span>
        </div>
      </form>
    </Form>
  );
}
