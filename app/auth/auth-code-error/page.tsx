import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <>
      <div className="bg-destructive/20 rounded-md p-4 mb-4 space-y-3">
        <div className="text-destructive text-sm">
          Something went wrong. Please try again.
        </div>
      </div>
      <div className="mx-auto w-fit">
        <Button asChild variant="default">
          <Link href="/auth/login">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </Button>
      </div>
    </>
  );
}
