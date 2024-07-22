"use client"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="#" className="font-bold text-lg" prefetch={false}>
            Tournaments
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Sign Up
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            Sign In
          </Link>
          <Avatar className="border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4">All Tournaments</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <img
                src="/placeholder.svg"
                alt="Tournament Thumbnail"
                className="rounded-t-lg w-full h-[200px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">Tournament Title</div>
                  <Badge variant="outline">Ongoing</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Room ID</div>
                    <div>Oe31b70H</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Password</div>
                    <div>abc123</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Entry Price</div>
                    <div>$10</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mode</div>
                    <div>Solo</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Map</div>
                    <div>Erangel</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Winning Price</div>
                    <div>$1000</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Eligibility</div>
                    <div>18+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div>John Doe</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                    <div>32/64</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div>4</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Launch Date</div>
                    <div>2023-06-01</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Collection</div>
                    <div>Esports</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <img
                src="/placeholder.svg"
                alt="Tournament Thumbnail"
                className="rounded-t-lg w-full h-[200px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">Tournament Title</div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Room ID</div>
                    <div>Oe31b70H</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Password</div>
                    <div>abc123</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Entry Price</div>
                    <div>$10</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mode</div>
                    <div>Duo</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Map</div>
                    <div>Miramar</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Winning Price</div>
                    <div>$500</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Eligibility</div>
                    <div>16+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div>Jane Doe</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                    <div>0/64</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div>2</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Launch Date</div>
                    <div>2023-07-01</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Collection</div>
                    <div>Battle Royale</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <img
                src="/placeholder.svg"
                alt="Tournament Thumbnail"
                className="rounded-t-lg w-full h-[200px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">Tournament Title</div>
                  <Badge variant="outline">Ended</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Room ID</div>
                    <div>Oe31b70H</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Password</div>
                    <div>abc123</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Entry Price</div>
                    <div>$20</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mode</div>
                    <div>Squad</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Map</div>
                    <div>Sanhok</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Winning Price</div>
                    <div>$2000</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Eligibility</div>
                    <div>21+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div>Bob Smith</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                    <div>64/64</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div>4</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Launch Date</div>
                    <div>2023-05-01</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Collection</div>
                    <div>Tournaments</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <img
                src="/placeholder.svg"
                alt="Tournament Thumbnail"
                className="rounded-t-lg w-full h-[200px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">Tournament Title</div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Room ID</div>
                    <div>Oe31b70H</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Password</div>
                    <div>abc123</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Entry Price</div>
                    <div>$15</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Mode</div>
                    <div>Squad</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Map</div>
                    <div>Vikendi</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Winning Price</div>
                    <div>$1500</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Eligibility</div>
                    <div>18+</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div>Alice Johnson</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Participants</div>
                    <div>0/64</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div>4</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Launch Date</div>
                    <div>2023-08-01</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Collection</div>
                    <div>Esports</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}