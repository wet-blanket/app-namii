"use client";

import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingSchema } from "@/schema/onboarding-schema";
import { saveOnboardingInformation } from "@/app/onboarding/action";
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

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      fullName: "",
      userName: "",
    },
  });

  const onSubmit = async (onboardingData: z.infer<typeof OnboardingSchema>) => {
    try {
      setIsLoading(false);
      // await saveOnboardingInformation(onboardingData);

      console.log("Information saved."); //TODO: change this to a toast)

      onComplete?.();
    } catch (error) {
      console.error("Onboarding Error:", error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
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
          name="userName"
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
