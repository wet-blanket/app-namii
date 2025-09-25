"use server";

import { createClient } from "@/utils/supabase/server";
import { OnboardingSchema } from "@/schema/onboarding-schema";

export async function saveOnboardingInformation(data: unknown) {
  const parsed = OnboardingSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { fullName, alias } = parsed.data;
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, full_name: fullName, alias });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function verifyInviteCode(code: unknown) {}
