"use client"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import tournaments from "./tournaments.json" // Import the JSON data

export default function Tournaments() {
  return (
    <>
  
      <div className="flex flex-col min-h-screen bg-muted/40 bg-black">
        <main className="flex-1 p-4 sm:p-6 bg-black text-orange-600">
          <h2 className="text-2xl font-bold mb-4">All Tournaments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tournaments.map((tournament, index) => (
              <Card key={index} className="bg-black text-orange-600">
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
                        <div className="text-sm text-muted-foreground">Room ID</div>
                        <div>{tournament.roomId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Password</div>
                        <div>{tournament.password}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Entry Price</div>
                        <div>{tournament.entryPrice}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Mode</div>
                        <div>{tournament.mode}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Map</div>
                        <div>{tournament.map}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Winning Price</div>
                        <div>{tournament.winningPrice}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Eligibility</div>
                        <div>{tournament.eligibility}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                        <div>{tournament.owner}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Participants</div>
                        <div>{tournament.participants}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Team Size</div>
                        <div>{tournament.teamSize}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Launch Date</div>
                        <div>{tournament.launchDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Collection</div>
                        <div>{tournament.collection}</div>
                      </div>
                    </div>
                    {(tournament.status === "Ongoing" || tournament.status === "Upcoming") && (
                      <button className="mt-4 w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        Register
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
