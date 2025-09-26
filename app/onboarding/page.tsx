import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import Onboarding from "@/app/onboarding/components/onboarding";

export default async function OnboardingPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("onboarding")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch profile:", error);
    // redirect?
  }

  if (profile?.onboarding) {
    redirect("/dashboard");
  }

  return <Onboarding />;
}
