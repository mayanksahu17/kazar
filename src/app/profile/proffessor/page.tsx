"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type ProfessorDashboardData = {
  teachingSchedule: string[]
  assignments: string[]
}

export default function ProfessorDashboard() {
  const router = useRouter()
  const [data, setData] = useState<ProfessorDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/signin")
          return
        }

        const response = await fetch("/api/dashboard/professor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data")
        }

        const result = await response.json()
        setData(result.data)
      } catch (err) {
        setError("An error occurred while fetching dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Professor Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {data && (
            <div className="px-4 py-6 sm:px-0">
              <h2 className="text-xl font-semibold mb-4">Teaching Schedule</h2>
              <ul className="list-disc pl-5">
                {data.teachingSchedule.map((schedule, index) => (
                  <li key={index}>{schedule}</li>
                ))}
              </ul>
              <h2 className="text-xl font-semibold mt-6 mb-4">Assignments</h2>
              <ul className="list-disc pl-5">
                {data.assignments.map((assignment, index) => (
                  <li key={index}>{assignment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

