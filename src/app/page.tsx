"use client"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Tournaments from '@/components/Tournament';
import Registered from "@/components/Registered";
import TDM from "@/components/TDM";
import axios from "axios";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col min-h-screen bg-black text-orange-500">
        <Header />
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
        {selectedTab === 'registered' && <Tournaments />}
        {/* {selectedTab === 'registered' && <Registered />} */}
        <Footer />
      </div>
    </>
  );
}
