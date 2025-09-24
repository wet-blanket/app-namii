"use client";

import { useState } from "react";
import { Waves } from "lucide-react";
import PersonalInformationForm from "@/app/onboarding/components/personal-information-form";
import OrganizationCode from "@/app/onboarding/components/organization-code-form";

export default function Onboarding() {
  const [step, setStep] = useState<1 | 2>(1);
  const totalSteps = 2;

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
          <h2 className="text-xl font-bold">
            {step === 1 ? "Let’s get started" : "Enter Invite Code"}
          </h2>
          <h3 className="text-base-400">
            {step === 1
              ? "Set up your profile with a name and @handle so others will recognize you in the platform."
              : "Provide your invite code to securely join your organization and access the workspace."}
          </h3>
        </div>

        <div className="flex justify-center">
          {step === 1 ? (
            <PersonalInformationForm onComplete={() => setStep(2)} />
          ) : (
            <OrganizationCode
              onComplete={() => {
                /* e.g., route to dashboard */
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: totalSteps }, (_, i) => {
            const dotIndex = i + 1;
            const isActive = step === dotIndex;
            return (
              <span
                key={dotIndex}
                className={`h-2 w-2 rounded-full ${
                  isActive ? "bg-primary/50" : "bg-muted-foreground/40"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
