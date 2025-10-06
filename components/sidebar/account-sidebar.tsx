"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/utils/supabase/client";
import { signOut } from "@/utils/auth/action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Profile {
  full_name: string | null;
  username: string | null;
}

export default function AccountSidebar() {
  const { isMobile } = useSidebar();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserAndProfile = async () => {
      const supabase = createSupabaseBrowserClient();

      // Get authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      // Fetch profile data
      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, username")
          .eq("id", user.id)
          .single();

        setProfile(profileData);
      }

      setLoading(false);
    };

    getUserAndProfile();
  }, []);

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse" />
            <div className="grid flex-1 text-start text-sm leading-tight">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse mt-1" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // Use profile.full_name instead of user_metadata.name
  const name = profile?.full_name || user?.user_metadata?.name || "User";
  const email = user?.email;
  const avatar_url = user?.user_metadata?.avatar_url;

  // Extract first name for fallback
  const getFirstNameInitials = (fullName?: string) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    return names[0]?.charAt(0).toUpperCase() || "U";
  };

  const firstNameInitial = getFirstNameInitials(name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-md">
                <AvatarImage src={avatar_url} alt={name} />
                <AvatarFallback className="rounded-lg bg-primary/20 text-primary">
                  {firstNameInitial}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-semibold">{name}</span>
                <span className="truncate text-xs">{email}</span>
              </div>
              <ChevronsUpDown className="ms-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar_url} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {firstNameInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-start text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:text-primary focus:!bg-primary/20">
                <Sparkles className="focus:text-primary" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="focus:text-primary focus:!bg-primary/20"
              >
                <Link href="/settings/account">
                  <BadgeCheck className="focus:text-primary" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="focus:text-primary focus:!bg-primary/20"
              >
                <Link href="/settings">
                  <CreditCard className="focus:text-primary" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="focus:text-primary focus:!bg-primary/20"
              >
                <Link href="/settings/notifications">
                  <Bell className="focus:text-primary" />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="focus:text-primary focus:!bg-primary/20"
            >
              <LogOut className="focus:text-primary" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
