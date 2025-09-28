"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrganizationSchema } from "@/schema/developer-schema";
import { createOrganization } from "@/app/(protected)/organization/action";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NewOrganizationForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (orgData: z.infer<typeof OrganizationSchema>) => {
    setIsLoading(true);
    setFormError(null);

    try {
      const result = await createOrganization(orgData);

      if (result.error) {
        showError(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
      }
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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus />
          New Organization
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SheetHeader>
              <SheetTitle>Create New Organization</SheetTitle>
              <SheetDescription>
                Set up a new organization to bring your team together. Manage
                members, assign roles, and keep everything organized in one
                place.
              </SheetDescription>
            </SheetHeader>

            {formError && (
              <div className="px-4">
                <div className="bg-destructive/20 rounded-md p-4 mb-4">
                  <div className="text-destructive text-sm">{formError}</div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel htmlFor={field.name}>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Avengers"
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
              name="description"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel htmlFor={field.name}>Description</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Earth’s mightiest heroes united together."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating new organization...
                  </div>
                ) : (
                  "Create Organization"
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
