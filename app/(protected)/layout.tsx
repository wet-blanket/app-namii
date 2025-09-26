import { checkOnboardingStatus } from "@/app/(protected)/action";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkOnboardingStatus();
  return <>{children}</>;
}
