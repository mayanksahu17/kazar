"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Tournaments  from '@/components/Tournament' 
import axios from "axios";

async function getTournamets() {
  const response = await axios.get("/api/foo")
  return response;
}
export default   function Component() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token);
  }, []);

 

  return (
    <>  
     {/* <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Scrims Crown</title>
      </head> */}
    <div className="flex flex-col min-h-screen bg-gray-900 text-orange-500">
    <Header />
    <Tournaments />
     <Footer />
  
    </div>
    </>
  );
}

