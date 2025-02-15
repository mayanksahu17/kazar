"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Loader2, ArrowLeft } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  userName: string
  enrollmentNumber: string
  year: number
  section: string
  totalScore: number
  email: string
}

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("/api/leaderboard")
      const data = await response.json()
      setLeaderboard(data.data)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-green-500 font-semibold">{rank}</span>
    }
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <Button variant="outline" size="sm" className="mb-4 bg-white hover:bg-gray-100" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center py-4">Student Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-16 font-semibold text-green-700">Rank</TableHead>
                    <TableHead className="font-semibold text-green-700">Name</TableHead>
                    <TableHead className="font-semibold text-green-700">Enrollment</TableHead>
                    <TableHead className="font-semibold text-green-700">Year</TableHead>
                    <TableHead className="font-semibold text-green-700">Section</TableHead>
                    <TableHead className="text-right font-semibold text-green-700">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard?.map((entry, index) => (
                    <TableRow key={entry.enrollmentNumber} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell className="font-medium">{getRankIcon(entry.rank)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-blue-600">{entry.userName}</div>
                          <div className="text-sm text-gray-500">{entry.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{entry.enrollmentNumber}</TableCell>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.section}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                          {entry.totalScore.toFixed(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LeaderboardPage

