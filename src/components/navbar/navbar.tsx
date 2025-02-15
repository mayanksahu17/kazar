"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically importing modal and other components
const Model = dynamic(() => import("../GetInTouch/Model"), { ssr: false });
const Help = dynamic(() => import("../GetInTouch/Help"), { ssr: false });

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; userName: string; role: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  const dashboardRoute = user?.role ? `/dashboard/${user.role}` : "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] mt-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between py-2 px-4 bg-green-100/90 border border-gray-200 rounded-full shadow-md backdrop-blur-sm">
          {/* Logo */}
          <Link href="/">
            <img
              alt="Hiredeasy Logo"
              className="h-12 w-auto cursor-pointer transition-transform duration-200 hover:scale-110"
              src="/Hiredeasy.png"
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-500 hover:text-gray-600">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/Job-Data" className="text-sm font-medium bg-green-600 text-white py-1.5 px-4 rounded-full hover:bg-green-700">
              LeaderBoard
            </Link>
          </nav>

          {/* User Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href={dashboardRoute} className="text-sm font-medium bg-blue-500 text-white py-1.5 px-4 rounded-md hover:bg-blue-600">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium bg-red-500 text-white py-1.5 px-4 rounded-md hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-green-500">
                  Login
                </Link>
                <Link href="/sign-up" className="text-sm font-medium text-gray-700 hover:text-green-500">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-green-100/90 border border-gray-200 rounded-lg shadow-lg p-4 backdrop-blur-sm z-[200] relative">
          <nav className="flex flex-col space-y-4">
            <Link href="/Job-Data" className="text-sm font-medium bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 text-center">
              LeaderBoard
            </Link>

            {user ? (
              <>
                <Link href={dashboardRoute} className="text-sm font-medium bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-sm font-medium bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 text-center">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-green-500 text-center">
                  Login
                </Link>
                <Link href="/sign-up" className="text-sm font-medium text-gray-700 hover:text-green-500 text-center">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
