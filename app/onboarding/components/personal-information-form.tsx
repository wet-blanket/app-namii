"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingSchema } from "@/schema/onboarding-schema";
import { saveOnboardingInfo } from "@/app/onboarding/action";
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

export default function PersonalInformationForm({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  const onSubmit = async (onboardingData: z.infer<typeof OnboardingSchema>) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const result = await saveOnboardingInfo(onboardingData);

      if (result.error) {
        showError(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
      }

      onComplete?.();
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        {formError && (
          <div className="bg-destructive/20 rounded-md p-4 mb-4">
            <div className="text-destructive text-sm">{formError}</div>
          </div>
        )}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Full Name</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  placeholder="Juan Dela Cruz"
                  {...field}
                  autoComplete="off"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>@username</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  placeholder="jdcruz"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary w-full"
          disabled={
            isLoading
            // !form.watch("fullName")?.trim() ||
            // !form.watch("alias")?.trim()
          }
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving Information...
            </div>
          ) : (
            "Save & Continue"
          )}
        </Button>
      </form>
    </Form>
  );
}
