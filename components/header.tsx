"use client";

import React from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Sun, Moon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const HeaderComponent = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const getMainSection = () => {
    if (pathname.startsWith("/jobs")) return "Jobs";
    if (pathname.startsWith("/applicants")) return "Applicants";
    if (pathname.startsWith("/analytics")) return "Analytics";
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/account")) return "Account";
    return "Dashboard";
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger variant="outline" className="max-md:scale-125" />

      <div className="flex items-center gap-2 ml-2">
        <span className="text-sm font-medium text-muted-foreground/80">
          General
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{getMainSection()}</span>
      </div>

      {/* Search and Right Side Controls */}
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
};

export default HeaderComponent;
