"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught error in protected route:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>

      <div className="flex gap-4 mt-5">
        <Button
          onClick={() => reset()}
          className="rounded-lg bg-primary px-4 py-2"
        >
          Try again
        </Button>

        <Link
          href="/"
          className="px-4 py-2 text-muted-foreground hover:underline"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
