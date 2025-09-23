import Link from "next/link";
import { Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/auth/action";

export default function Login() {
  return (
    <div className="space-y-9">
      {/* Logo placeholder */}
      <div className="flex justify-start">
        <Waves className="h-8 w-8 text-primary" />
      </div>

      {/* Main heading */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Sign in to Namii</h1>
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
        <form action={signInWithGoogle}>
          <Button type="submit" variant="outline" className="w-full">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </form>
      </div>

      {/* Footer links */}
      <div className="text-sm text-base-400 underline-offset-3">
        <p>
          By signing in, you agree to the{" "}
          <Link href="/terms" className="hover:text-primary/80 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:text-primary/80 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="mt-8">
          Need help?{" "}
          <Link
            href="/support"
            className="text-xs text-primary-600 hover:text-primary-200 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
