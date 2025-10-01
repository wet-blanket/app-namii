"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const menuStructure = {
  general: {
    label: "General",
    items: {
      "/dashboard": "Dashboard",
      "/timesheet": "Timesheet",
      "/trainings": "Trainings",
      "/teams": "Teams",
      "/activity": "Activity",
      "/ai": "AI Workflow",
    },
  },
  management: {
    label: "Management",
    items: {
      "/analytics": "Analytics",
      "/engagement": "Engagement",
      "/people": "People",
      "/leadership": "Leadership",
    },
  },
  developer: {
    label: "Developer",
    items: {
      "/feature-request": "Feature Requests",
      "/bugs": "Platform Bugs",
      "/logs": "Logs",
      "/organization": "Organization",
    },
  },
};

// Child route labels mapping
const childRouteLabels: Record<string, string> = {
  "invite-codes": "Invite Codes",
  permissions: "Permissions",
  settings: "Settings",
  details: "Details",
  edit: "Edit",
  create: "Create",
  new: "New",
};

interface BreadcrumbData {
  label: string;
  href?: string;
  isCurrent: boolean;
}

export default function HeaderComponent() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const getBreadcrumbs = (): BreadcrumbData[] => {
    for (const [sectionKey, section] of Object.entries(menuStructure)) {
      for (const [route, label] of Object.entries(section.items)) {
        if (pathname === route || pathname.startsWith(route + "/")) {
          const breadcrumbs: BreadcrumbData[] = [
            { label: section.label, href: route, isCurrent: false },
            { label, href: route, isCurrent: pathname === route },
          ];

          if (pathname !== route) {
            const remainingPath = pathname.slice(route.length + 1);
            const pathSegments = remainingPath.split("/").filter(Boolean);

            pathSegments.forEach((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const label =
                childRouteLabels[segment] ||
                segment
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

              const segmentPath = pathSegments.slice(0, index + 1).join("/");
              const fullHref = `${route}/${segmentPath}`;

              breadcrumbs.push({
                label,
                href: isLast ? undefined : fullHref,
                isCurrent: isLast,
              });
            });
          }

          return breadcrumbs;
        }
      }
    }

    return [
      { label: "General", href: "/dashboard", isCurrent: false },
      { label: "Dashboard", href: "/dashboard", isCurrent: true },
    ];
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger variant="outline" className="max-md:scale-125" />

      <Breadcrumb className="ml-2">
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.isCurrent ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href!}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        {/* <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="h-4 w-4 scale-100 dark:scale-0 transition-transform" />
          <Moon className="h-4 w-4 absolute scale-0 dark:scale-100 transition-transform" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}

        <Avatar className="h-8 w-8">
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
