"use client"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"                                                                                                                                                                                                                                    
import { toast } from "react-toastify"
import {useRouter}  from "next/navigation"


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


export default function Tournaments() {

  const router = useRouter()
  const register =  () =>{
      if (!localStorage.getItem("token")) {
        toast.error("please login to register")
        router.push("/sign-in")
      }


  }

  return (
    <>
  
      <div className="flex flex-col min-h-screen bg-muted/40 bg-gray-900">
        <main className="flex-1 p-4 sm:p-6  bg-gray-900">
          <h2 className="text-2xl font-bold mb-4">All Tournaments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tournaments.map((tournament, index) => (
              <Card key={index} className="bg-gray-900 text-orange-600">
                <CardHeader>
                  <img
                    src={tournament.image}
                    alt={`${tournament.title} Thumbnail`}
                    className="rounded-t-lg w-full h-[200px] object-cover"  
                  />  
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-lg">{tournament.title}</div>
                      <Badge>{tournament.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Room ID</div>
                        <div>{tournament.roomId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Password</div>
                        <div>{tournament.password}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Entry Price</div>
                        <div>{tournament.entryPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Mode</div>
                        <div>{tournament.mode}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Map</div>
                        <div>{tournament.map}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Winning Price</div>
                        <div>{tournament.winningPrice}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Eligibility</div>
                        <div>{tournament.eligibility}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Owner</div>
                        <div>{tournament.owner}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Participants</div>
                        <div>{tournament.participants}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Team Size</div>
                        <div>{tournament.teamSize}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-200">Launch Date</div>
                        <div>{tournament.launchDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-200">Collection</div>
                        <div>{tournament.collection}</div>
                      </div>
                    </div>
                    {(tournament.status === "Ongoing" || tournament.status === "Upcoming") && (
                      <button
                      onClick={register}
                       className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Register
                      </button>
                    )}
                    {(tournament.status === "Ended")&&(
                       <button
                  
                        className="mt-4 w-full py-2 bg-gray-400 text-white rounded-lg hover:bg-orange-700 transition-colors">
                         Ended
                       </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
