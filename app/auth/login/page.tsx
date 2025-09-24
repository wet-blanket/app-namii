import Link from "next/link";
import { Waves } from "lucide-react";
import GoogleAuth from "@/components/auth/google-auth";
import LoginForm from "@/app/auth/login/components/login-form";

export default function Login() {
  // TODO: move the logo and footer links to /auth/layout.tsx
  return (
    <div className="space-y-9">
      {/* Logo placeholder */}
      <div className="flex justify-start">
        <Waves className="h-8 w-8 text-primary" />
      </div>

      {/* Main heading */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Sign in to Nami</h1>
        <p className="text-base-400">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-xs text-primary-600 hover:text-primary/80 hover:underline underline-offset-2"
          >
            Get started →
          </Link>
        </p>
      </div>

      <div className="space-y-5">
        <LoginForm />
        <GoogleAuth />
      </div>

      {/* Footer links */}
      <div className="text-xs text-base-400 underline-offset-3">
        <p>
          By signing in, you agree to the{" "}
          <Link
            href="/terms"
            className="text-primary-600 hover:text-primary/80 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary-600 hover:text-primary/80 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-8">
          Need help?{" "}
          <Link
            href="/support"
            className="text-primary-600 hover:text-primary-200 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
