import { Waves } from "lucide-react";
import OnboardingForm from "@/app/onboarding/components/onboarding-form";

export default function Onboarding() {
  return (
    <div className="min-h-screen w-full relative p-12 flex">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: "#000000",
          backgroundImage: `
          radial-gradient(circle at 25% 25%, #222222 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, #111111 1px, transparent 1px)
        `,
          backgroundSize: "10px 10px",
          imageRendering: "pixelated",
        }}
      />

      <div className="w-full max-w-xs relative m-auto space-y-6 text-center">
        <div className="flex justify-center">
          <Waves className="h-8 w-8 text-primary" />
        </div>

        <div>
          {/* TODO: Change the static name */}
          <h2 className="text-xl font-bold">Hello, James</h2>
          <h3 className="text-base-400">
            Provide your invite code to securely join your organization and
            access all features.
          </h3>
        </div>

        <div className="flex justify-center">
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}
