"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTeamSchema } from "@/schema/team-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function CreateTeamForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (teamData: z.infer<typeof CreateTeamSchema>) => {
    setIsLoading(true);
    setFormError(null);

    try {
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
          New Team
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SheetHeader>
              <SheetTitle>Create New Team</SheetTitle>
              <SheetDescription>
                Set up a new team to bring your member together. Manage members
                and keep everything organized in one place.
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
                  <FormLabel htmlFor={field.name}>Team Name</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Shohoku"
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
                      placeholder="Best of the best"
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
                    Creating new team...
                  </div>
                ) : (
                  "Create Team"
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
