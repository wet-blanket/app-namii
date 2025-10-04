"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { OnboardingSchema, VerifyCodeSchema } from "@/schema/onboarding-schema";

export async function saveOnboardingInfo(data: unknown) {
  const parsed = OnboardingSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { fullName, username } = parsed.data;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    username,
  });

  if (error) {
    if (error.code === "23505") {
      if (error.message.includes("username")) {
        return { error: "Username already taken" };
      }
      return { error: "This information is already in use" };
    }

    console.error("Error saving onboarding info:", error);
    return { error: error.message };
  }

  return { success: "Information saved", profile: { fullName, username } };
}

export async function verifyInviteCode(data: unknown) {
  const parsed = VerifyCodeSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { verificationCode } = parsed.data;

  const { data: inviteCode, error: inviteCodeError } = await supabase
    .from("invite_codes")
    .select("*")
    .eq("code", verificationCode)
    .maybeSingle();

  if (inviteCodeError) {
    console.error("Error fetching the invite code", inviteCodeError);
    return { error: "Unable to verify the invite code availability" };
  }

  if (!inviteCode) {
    return { error: "Your code does not exist." };
  }

  if (inviteCode.is_used) {
    return {
      error: "Your invite code is already used. Please request a new one.",
    };
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      role: inviteCode.role,
      org_id: inviteCode.org_id,
      onboarding: true,
    })
    .eq("id", user.id);

  if (profileError) {
    console.error("Error updating profile", profileError);
    return { error: "Unable to update profile" };
  }

  const { error: updateInviteCodeError } = await supabase
    .from("invite_codes")
    .update({
      is_used: true,
      used_by: user.id,
      used_at: new Date().toISOString(),
    })
    .eq("id", inviteCode.id);

  if (updateInviteCodeError) {
    console.error("Error updating invite code", updateInviteCodeError);
    return { error: "Unable to update invite code" };
  }

  return { success: "Onboarding Complete" };
}
