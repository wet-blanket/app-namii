"use server";

import { redirect } from "next/navigation";
import type { Provider } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/utils/supabase/server";

interface AuthData {
  email: string;
  password: string;
}

const signInWithProvider = (provider: Provider) => async () => {
  const supabase = await createSupabaseServerClient();
  const authCallbackUrl = `${process.env.APP_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: authCallbackUrl,
    },
  });

  if (error) {
    console.error(error);
  }

  if (data.url) {
    redirect(data.url);
  }
};

const signUp = async (authData: AuthData) => {
  const supabase = await createSupabaseServerClient();

  try {
    const { error } = await supabase.auth.signUp(authData);

    if (error) {
      return { error: error.message };
    }

    return { success: "Check your email to confirm your account." };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};

const signIn = async (authData: AuthData) => {
  const supabase = await createSupabaseServerClient();

  try {
    const { error } = await supabase.auth.signInWithPassword(authData);

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "An unexpected error occured. Please try again." };
  }
};

const signOut = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect("/auth/login");
};

const signInWithGoogle = signInWithProvider("google");

export { signInWithGoogle, signOut, signUp, signIn };
