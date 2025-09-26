"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export async function checkOnboardingStatus() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("onboarding")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Unexpected profile error:", profileError);
    throw new Error("Failed to fetch profile");
  }

  if (!profile || profile.onboarding === false) {
    redirect("/onboarding");
  }

  return profile;
}
