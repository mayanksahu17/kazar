"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Sidebar from "../SideBar/sideBar";
import DashboardMain from "./dashboard-main";
import Warmup from "../Interview/warmup";
import JobsMain from "../jobs/jobs-main";
import ProfilePage from "@/app/profile/page";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAuth } from "@clerk/nextjs";

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false); // Paid user state

  const { isLoaded, userId, sessionId, getToken } = useAuth();

  useEffect(() => {
    if (!userId) {
      console.warn("No user ID provided to DashboardPage");
      return;
    }

    const fetchPaymentStatus = async () => {
      try {
        const token = await getToken();
        const response = await fetch("/api/checkPaid", {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Id": userId,
          },
        });

        const data = await response.json();
        setIsPaidUser(data.paidstatus === "Paid"); // Update paid status
      } catch (error) {
        console.error("Failed to fetch payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [userId, getToken]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Restore scroll when sidebar is closed
    }
  }, [sidebarOpen]);

  const handleTabChange = async (tab: string) => {
    setIsLoading(true);
    try {
      setCurrentTab(tab);
      setSidebarOpen(false);
    } catch (error) {
      console.error("Error while changing tab:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 relative">
        {/* Hamburger Menu */}
        <button
          className="lg:hidden fixed top-20 left-4 z-[60] p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
          disabled={isLoading}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>

        {/* Background overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[50] lg:hidden"
            onClick={closeSidebar} // Closes sidebar on clicking overlay
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 ${
            sidebarOpen ? "z-[55]" : "z-[10]"
          } lg:z-[5] h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 bg-white shadow-xl`}
        >
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={handleTabChange}
            setSidebarOpen={setSidebarOpen}
            isPaidUser={isPaidUser} // Use paid user state
            sidebarOpen={sidebarOpen}
            className="h-full"
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-0">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 z-[70] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <div
              className={`p-4 md:p-6 lg:p-8 ${
                currentTab === "jobs" ? "lg:pt-20" : ""
              } max-w-7xl mx-auto`}
            >
              {currentTab === "dashboard" && (
                <DashboardMain isPaidUser={isPaidUser} />
              )}
              {currentTab === "profile" && <ProfilePage />}
              {currentTab === "jobs" && <JobsMain />}
              {currentTab === "interview" && <Warmup />}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
