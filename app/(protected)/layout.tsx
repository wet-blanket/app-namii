import { checkOnboardingStatus } from "@/app/(protected)/action";
import HeaderComponent from "@/components/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkOnboardingStatus();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderComponent />
        <div className="flex flex-1 flex-col p-4 gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
