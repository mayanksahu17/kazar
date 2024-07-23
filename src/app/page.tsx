"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
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
  const [tournaments, setTournament] = useState([])
  try {
    const response  : any= getTournamets()
    console.log(response.data)
    if (response.data) {
      setTournament(response.data.tournaments)
    }
  } catch (error) {
    
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token);
  }, []);

 

  return (
    <div className="flex flex-col min-h-screen bg-black text-orange-500">
    <Header />
    <Tournaments tournaments= {tournaments}/>
      {/* <main className="flex-1 grid gap-6 p-4 sm:p-6 md:grid-cols-3">
 
      </main> */}
    </div>
  );
}

