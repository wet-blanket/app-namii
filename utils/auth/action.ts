"use server";

import { redirect } from "next/navigation";
import type { Provider } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

const signInWithProvider = (provider: Provider) => async () => {
  const supabase = await createClient();
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

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/auth/login");
};

const signInWithGoogle = signInWithProvider("google");

export { signInWithGoogle, signOut };
