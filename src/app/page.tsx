"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Component() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("token","")
    Cookies.remove("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
    router.push("/")
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-orange-500">
    <Header />
      <main className="flex-1 grid gap-6 p-4 sm:p-6 md:grid-cols-3">
 
      </main>
    </div>
  );
}

