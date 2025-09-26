"use server";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { OnboardingSchema, VerifyCodeSchema } from "@/schema/onboarding-schema";

export async function saveOnboardingInformation(data: unknown) {
  const parsed = OnboardingSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // const { fullName, userName } = parsed.data;
  // const { error } = await supabase
  //   .from("profiles")
  //   .upsert({ id: user.id, full_name: fullName, user_name: userName });

  // if (error) {
  //   return { error: error.message };
  // }

  return { success: true };
}

export async function verifyInviteCode(inviteCode: unknown) {
  const parsed = VerifyCodeSchema.safeParse(inviteCode);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  // verify the invite code
  // const { data: invite, error: inviteError } = await supabase
  //   .from("invite_codes")
  //   .select("*")
  //   .eq("code", inviteCode)
  //   .single();

  // if (inviteError || !invite) {
  //   return { error: "Invalid invite code" };
  // }

  // // join the org based on the user invite code
  // const { error: memberError } = await supabase
  //   .from("organization_members")
  //   .insert({
  //     user_id: user.id,
  //     organization_id: invite.organization_id,
  //     role: invite.role,
  //   });

  // if (memberError) {
  //   return { error: memberError.message };
  // }

  // return {
  //   success: true,
  //   organizationId: invite.organization_id,
  //   role: invite.role,
  // };
}
