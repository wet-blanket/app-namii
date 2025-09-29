"use client";

import * as z from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRoundPlus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvitePeopleSchema } from "@/schema/people-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
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

export function InvitePeopleForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof InvitePeopleSchema>>({
    resolver: zodResolver(InvitePeopleSchema),
    defaultValues: {
      inviteCode: "",
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setFormError(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <UserRoundPlus />
          Invite Org Member
        </Button>
      </SheetTrigger>
      <SheetContent className="p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SheetHeader>
              <SheetTitle>Create Invite Code</SheetTitle>
              <SheetDescription>
                Generate a unique invite code to share with your team. Use this
                code to let others join quickly and securely.
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
              name="inviteCode"
              render={({ field }) => (
                <FormItem className="px-4">
                  <FormLabel htmlFor={field.name}>Invite Code</FormLabel>
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder="Generate 6 digit code"
                      {...field}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button type="submit">Create Invite Code</Button>
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
