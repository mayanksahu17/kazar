"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  MedalIcon as Medal2,
  ScrollText,
  Trophy,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import FormModal from "./student-profile/formTest/ProfileForm/FormModal";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-green-50">
        {/* Sidebar */}
        <Sidebar className="bg-blue-600 text-black shadow-lg">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="flex items-center gap-2">
                  <a href="/" className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-green-500" />
                    <span className="font-bold text-lg">Student Portal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/student-tasks"
                    className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition text-black"
                  >
                    <LayoutDashboard className="h-4 w-4 text-black" />
                    <span>Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Profile Button */}
              <SidebarMenuItem>
                <Button
                  onClick={() => setIsProfileFormOpen(true)}
                  className="mt-4 w-full border-gray-300 bg-green-500 text-black hover:bg-green-600 
                  shadow-md rounded-md px-4 py-2 flex items-center justify-center"
                >
                  Complete Profile
                </Button>
                {/* Profile Completion Modal */}
                <FormModal
                  isOpen={isProfileFormOpen}
                  onClose={() => setIsProfileFormOpen(false)}
                  profileIndex={profileIndex}
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/leaderboard"
                    className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition text-black"
                  >
                    <Trophy className="h-4 w-4 text-black" />
                    <span>Leaderboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="/resume"
                    className="flex items-center gap-2 hover:bg-blue-700 p-2 rounded-lg transition text-black"
                  >
                    <ScrollText className="h-4 w-4 text-black" />
                    <span>Resume</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white shadow-md px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center gap-4">
              <h1 className="font-semibold text-xl text-black">
                Student Dashboard
              </h1>
            </div>
          </header>

          {/* Main Section */}
          <main className="flex-1 p-6 text-black">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
