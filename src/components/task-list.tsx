"use client"

import { useEffect, useState, useCallback } from "react"
import { AlertCircle, Clock, Star, CheckCircle, PlusCircle } from "lucide-react"
import cn from "classnames"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

interface Task {
  _id: string
  title: string
  description: string
  difficultyLevel: "Easy" | "Medium" | "Hard"
  scorePoints: number                                             
  deadline: string
  publisher: { _id: string; userName: string; role: string }
  joiners: string[]
  isSubmitted: boolean
}

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const userId = "USER_ID_FROM_AUTH" // Replace this with actual authentication

  // Fetch all tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/api/tasks")
        const data = await response.json()
        if (data.success) {
          setTasks(data.data)
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        setError("Failed to load tasks. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  // Handle joining a task
  const handleJoinTask = useCallback(
    async (taskId: string) => {
      try {
        setLoading(true)
        const response = await fetch(`/api/task/${taskId}/join`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
        const data = await response.json()

        if (data.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === taskId ? { ...task, joiners: [...task.joiners, userId] } : task
            )
          )
          toast({
            title: "Joined Task",
            description: "You have successfully joined this task!",
          })
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        setError("Failed to join task. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [toast, userId]
  )

  // Handle submitting a task
  const handleSubmitTask = useCallback(
    async (taskId: string) => {
      try {
        setLoading(true)
        const response = await fetch(`/api/task/${taskId}/SUBMIT`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submittedContent: "My completed work" }), // Modify if needed
        })
        const data = await response.json()

        if (data.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === taskId ? { ...task, isSubmitted: true } : task
            )
          )
          toast({
            title: "Task Submitted",
            description: "Your task has been submitted successfully!",
          })
        } else {
          throw new Error(data.message)
        }
      } catch (err) {
        setError("Failed to submit task. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => {
        const hasJoined = task.joiners.includes(userId)

        return (
          <Card key={task._id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{task.title}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-semibold",
                    task.difficultyLevel === "Easy" && "bg-green-100 text-green-800",
                    task.difficultyLevel === "Medium" && "bg-yellow-100 text-yellow-800",
                    task.difficultyLevel === "Hard" && "bg-red-100 text-red-800"
                  )}
                >
                  {task.difficultyLevel}
                </span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Due {new Date(task.deadline).toLocaleDateString()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{task.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{task.scorePoints} points</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {task.isSubmitted ? (
                <Button className="flex-1" variant="secondary" disabled>
                  Submitted <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                </Button>
              ) : hasJoined ? (
                <Button className="flex-1" onClick={() => handleSubmitTask(task._id)} disabled={loading}>
                  Submit Task
                </Button>
              ) : (
                <Button className="flex-1" onClick={() => handleJoinTask(task._id)} disabled={loading}>
                  Join Task <PlusCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}