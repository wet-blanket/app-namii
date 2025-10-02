"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { OrganizationSchema } from "@/schema/developer-schema";
import { ROLE_DEV } from "@/lib/constant";

export async function createOrganization(data: unknown) {
  const parsed = OrganizationSchema.safeParse(data);
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
    .select("role, id")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError);
    return { error: "Unable to fetch user profile" };
  }

  if (profile.role !== ROLE_DEV) {
    return { error: "Only users with role 'dev' can create organizations" };
  }

  const { name, description } = parsed.data;

  const { data: existingOrg, error: checkError } = await supabase
    .from("organizations")
    .select("id")
    .eq("name", name)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    console.error("Error checking organization name:", checkError);
    return { error: "Unable to verify organization name availability" };
  }

  if (existingOrg) {
    return {
      error:
        "Organization name already exists. Please choose a different name.",
    };
  }

  const { error } = await supabase.from("organizations").insert({
    name,
    description,
    created_by: profile.id,
  });

  if (error) {
    console.error("Error saving organization info:", error);
    return { error: error.message };
  }

  return { success: "Organization created" };
}
