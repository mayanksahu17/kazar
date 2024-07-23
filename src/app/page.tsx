"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Tournaments  from '@/components/Tournament' 
import axios from "axios";

const tournaments = [
  {
    "title": "Tournament Title 1",
    "status": "Ongoing",
    "image": "http://res.cloudinary.com/doubpsp9q/image/upload/v1721737821/mad9mwiqfi8vnp3zzwjr.webp",
    "roomId": "Oe31b70H",
    "password": "abc123",
    "entryPrice": "$10",
    "mode": "Solo",
    "map": "Erangel",
    "winningPrice": "$1000",
    "eligibility": "18+",
    "owner": "John Doe",
    "participants": "32/64",
    "teamSize": "4",
    "launchDate": "2023-06-01",
    "collection": "Esports"
  },
  {
    "title": "Tournament Title 2",
    "status": "Upcoming",
    "image": "http://res.cloudinary.com/doubpsp9q/image/upload/v1721737883/u5tad883em4evkz17vtr.webp",
    "roomId": "Oe31b70H",
    "password": "abc123",
    "entryPrice": "$10",
    "mode": "Duo",
    "map": "Miramar",
    "winningPrice": "$500",
    "eligibility": "16+",
    "owner": "Jane Doe",
    "participants": "0/64",
    "teamSize": "2",
    "launchDate": "2023-07-01",
    "collection": "Battle Royale"
  },
  {
    "title": "Tournament Title 3",
    "status": "Ended",
    "image": "http://res.cloudinary.com/doubpsp9q/image/upload/v1721737911/xzqect0gvp9zch4oqjmg.webp",
    "roomId": "Oe31b70H",
    "password": "abc123",
    "entryPrice": "$20",
    "mode": "Squad",
    "map": "Sanhok",
    "winningPrice": "$2000",
    "eligibility": "21+",
    "owner": "Bob Smith",
    "participants": "64/64",
    "teamSize": "4",
    "launchDate": "2023-05-01",
    "collection": "Tournaments"
  },
  {
    "title": "Tournament Title 4",
    "status": "Upcoming",
    "image": "http://res.cloudinary.com/doubpsp9q/image/upload/v1721737950/j7petixnokqqyn8okaxm.webp",
    "roomId": "Oe31b70H",
    "password": "abc123",
    "entryPrice": "$15",
    "mode": "Squad",
    "map": "Vikendi",
    "winningPrice": "$1500",
    "eligibility": "18+",
    "owner": "Alice Johnson",
    "participants": "0/64",
    "teamSize": "4",
    "launchDate": "2023-08-01",
    "collection": "Esports"
  }
]


async function getTournamets() {
  const response = await axios.get("/api/foo")
  return response;
}
export default   function Component() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter()
  // const [tournaments, setTournament] = useState([])
  // try {
  //   const response  : any= getTournamets()
  //   console.log(response.data)
  //   if (response.data) {
  //     setTournament(response.data.tournaments)
  //   }
  // } catch (error) {
    
  // }
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

