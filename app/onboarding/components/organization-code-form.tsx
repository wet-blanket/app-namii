import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyCodeSchema } from "@/schema/onboarding-schema";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { verifyInviteCode } from "../action";

export default function OrganizationCode({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const otp = form.watch("verificationCode");

  //TODO: handle server action
  const onSubmit = async (inviteCode: z.infer<typeof VerifyCodeSchema>) => {
    try {
      setIsLoading(true);
      // await verifyInviteCode(inviteCode)

      console.log("Invite code verified"); //TODO: change this to a toast)

      onComplete?.();
    } catch (error) {
      console.error("Verification Error:", error);

      setFormError("Invalid verification code");
      setTimeout(() => setFormError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

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
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  autoFocus
                  maxLength={6}
                  {...field}
                  containerClassName="justify-between"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={otp.length < 6 || isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying your account...
            </div>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
