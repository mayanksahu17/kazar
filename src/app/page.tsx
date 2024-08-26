"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Tournaments from '@/components/Tournament';
import Registered from "@/components/Registered";
import TDM from "@/components/TDM";
import Hero from "@/components/Hero"
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

async function getTournaments() {
  const response = await axios.get("/api/foo");
  return response;
}

export default function Component() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('upcoming'); // Initial tab

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleTabClick = (tab : any) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-900 text-orange-500">
      <ToastContainer />
        <Header />
        <Hero />
        <div className="border"> </div>
        <div className="text-orange-600 flex items-center justify-center font-bold sm:px-6 border-b ">
          <div className={`border p-2 rounded ${selectedTab === 'upcoming' ? 'bg-orange-800 text-white' : ''}`}>
            <Button onClick={() => handleTabClick('upcoming')}>
              Upcoming
            </Button>
          </div>
          <div className={`border p-2 rounded ${selectedTab === 'tdm' ? 'bg-orange-800 text-white' : ''}`}>
            <Button onClick={() => handleTabClick('tdm')}>
              TDM
            </Button>
          </div>
          <div className={`border p-2 rounded ${selectedTab === 'registered' ? 'bg-orange-800 text-white' : ''}`}>
            <Button onClick={() => handleTabClick('registered')}>
              Registered
            </Button>
          </div>
        </div>
        {selectedTab === 'upcoming' && <Tournaments />}
        {selectedTab === 'tdm' && <TDM />}
        {selectedTab === 'registered' && <Registered />}
        <Footer />
      </div>
    </>
  );
}
