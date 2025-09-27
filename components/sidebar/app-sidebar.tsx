"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BadgeCheck,
  Bug,
  Database,
  Fingerprint,
  Goal,
  HeartHandshake,
  LayoutDashboard,
  Rocket,
  Sparkles,
  UserRound,
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

const generalMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: Fingerprint,
  },
  {
    title: "Trainings",
    url: "/trainings",
    icon: Goal,
  },
  {
    title: "Teams",
    url: "/teams",
    icon: Users,
  },
  {
    title: "AI Workflow",
    url: "/ai",
    icon: Sparkles,
  },
];

const managementMenu = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: Activity,
  },
  {
    title: "Engagement",
    url: "/engagement",
    icon: HeartHandshake,
  },
  {
    title: "People",
    url: "/people",
    icon: UserRound,
  },
  {
    title: "Leadership",
    url: "/leadership",
    icon: BadgeCheck,
  },
];

const developersMenu = [
  {
    title: "Feature Requests",
    url: "/feature-requests",
    icon: Rocket,
  },
  {
    title: "Platform Bugs",
    url: "/bugs",
    icon: Bug,
  },
  {
    title: "Logs",
    url: "/logs",
    icon: Database,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center px-4 gap-x-1 h-[47px]">
          <Waves className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Nami</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="text-muted-foreground">
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-accent-foreground font-bold">
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "!bg-sidebar-primary/20 !text-sidebar-primary hover:!bg-sidebar-primary/20"
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
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-accent-foreground font-bold">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "!bg-sidebar-primary/20 !text-sidebar-primary hover:!bg-sidebar-primary/20"
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
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-accent-foreground font-bold">
            Developer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {developersMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url
                        ? "!bg-sidebar-primary/20 !text-sidebar-primary hover:!bg-sidebar-primary/20"
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
      </SidebarContent>
      <SidebarFooter>
        <AccountSidebar />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
