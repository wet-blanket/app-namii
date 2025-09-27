"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ChartColumnBig,
  LayoutDashboard,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AccountSidebar from "@/components/sidebar/account-sidebar";
import { Separator } from "../ui/separator";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartColumnBig,
  },
  {
    title: "AI Workflow",
    url: "/ai",
    icon: Sparkles,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center px-4 gap-x-1 h-[47px]">
          <Waves className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-black">Nami</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-4">
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "!bg-sidebar-primary/20 !text-sidebar-primary hover:!bg-sidebar-primary"
                        : "hover:bg-sidebar-primary/20 hover:text-sidebar-primary"
                    }
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Developers</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AccountSidebar />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
