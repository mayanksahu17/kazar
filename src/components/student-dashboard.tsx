"use client"

import type { ReactNode, } from "react"
import { useState } from "react"
import { GraduationCap, LayoutDashboard, MedalIcon as Medal2, ScrollText, Trophy } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { CiLock } from "react-icons/ci"
import FormModal from "./student-profile/formTest/ProfileForm/FormModal"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="flex items-center gap-2">
                  <a href="/" className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    <span className="font-bold">Student Portal</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>

                {/* <SidebarMenuButton asChild>
                  <a href="/profile" className="flex items-center gap-2">
                    <Medal2 className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton> */}
                <Button
            onClick={() => setIsProfileFormOpen(true)}
          
            className={`mt-4 w-full sm:w-auto border-gray-300 bg-blue-600 text-white hover:bg-blue-700
             shadow-md rounded-md px-3 sm:px-3 py-1 sm:py-3 flex items-center justify-center ml-1`}
          >
            Complete Profile
            {/* {<CiLock className="ml-2" />} */}
          </Button>
          {/* Profile Completion Modal */}
      <FormModal
        isOpen={isProfileFormOpen}
        onClose={() => setIsProfileFormOpen(false)}
        profileIndex={profileIndex} // Ensure correct profileIndex is passed to the modal
      />

              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/leaderboard" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    <span>Leaderboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/resume" className="flex items-center gap-2">
                    <ScrollText className="h-4 w-4" />
                    <span>Resume</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center gap-4">
              <h1 className="font-semibold">Student Dashboard</h1>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

