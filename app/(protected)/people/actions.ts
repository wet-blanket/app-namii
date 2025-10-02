"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { InvitePeopleSchema } from "@/schema/people-schema";
import { ROLE_DEV, ROLE_DIRECTOR, ROLE_MANAGER } from "@/lib/constant";

export async function createInviteCode(data: unknown) {
  const parsed = InvitePeopleSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, id, org_id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return { error: "Unable to fetch user profile" };
  }

  if (
    profile.role !== ROLE_DEV &&
    profile.role !== ROLE_MANAGER &&
    profile.role !== ROLE_DIRECTOR
  ) {
    return { error: "Only users with right role can create invites" };
  }

  if (!profile.org_id) {
    return { error: "User must be associated with an organization" };
  }

  const { inviteCode, role } = parsed.data;

  const { data: existingCode, error: inviteCodeError } = await supabase
    .from("invite_codes")
    .select("id")
    .eq("code", inviteCode)
    .maybeSingle();

  if (inviteCodeError) {
    console.error("Error fetching the invite code", inviteCodeError);
    return { error: "Unable to verify the invite code availability" };
  }

  if (existingCode) {
    return {
      error: "Invite code already used. Please choose a different code.",
    };
  }

  const { error } = await supabase.from("invite_codes").insert({
    role,
    code: inviteCode,
    created_by: user.id,
    org_id: profile.org_id,
    is_used: false,
  });

  if (error) {
    console.error("Error saving organization info:", error);
    return { error: error.message };
  }

  return { success: "Invitation created" };
}
