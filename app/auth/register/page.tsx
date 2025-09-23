import Link from "next/link";
import { Waves } from "lucide-react";
import GoogleAuth from "@/components/auth/google-auth";
import RegisterForm from "@/app/auth/register/components/register-form";

export default function Register() {
  // TODO: move the logo and footer links to /auth/layout.tsx
  return (
    <div className="space-y-9">
      {/* Logo placeholder */}
      <div className="flex justify-start">
        <Waves className="h-8 w-8 text-primary" />
      </div>

      {/* Main heading */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Get started with Nami
        </h1>
        <p className="text-base-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-xs text-primary-600 hover:text-primary/80 hover:underline underline-offset-2"
          >
            Sign in →
          </Link>
        </p>
      </div>

      <div className="space-y-5">
        <RegisterForm />
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
