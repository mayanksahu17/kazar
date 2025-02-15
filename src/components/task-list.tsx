"use client"

import { useCallback, useState } from "react"
import { AlertCircle, Clock, Star, Trash2 } from "lucide-react"
import cn from "classnames"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface Task {
  id: string
  title: string
  description: string
  difficultyLevel: "Easy" | "Medium" | "Hard"
  scorePoints: number
  deadline: string
  isPublisher?: boolean
}

// This would come from your API
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete JavaScript Basics",
    description: "Learn fundamental concepts of JavaScript programming",
    difficultyLevel: "Easy",
    scorePoints: 10,
    deadline: "2024-03-01",
    isPublisher: true,
  },
  {
    id: "2",
    title: "Build a React App",
    description: "Create a simple React application with basic functionality",
    difficultyLevel: "Medium",
    scorePoints: 20,
    deadline: "2024-03-15",
  },
  {
    id: "3",
    title: "Advanced Algorithm Challenge",
    description: "Solve complex algorithmic problems",
    difficultyLevel: "Hard",
    scorePoints: 30,
    deadline: "2024-03-30",
  },
]

export function TasksList() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const { toast } = useToast()

  const handleJoinTask = useCallback(
    async (taskId: string) => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast({
          title: "Success",
          description: "You have successfully joined the task!",
        })
      } catch (err) {
        setError("Failed to join task. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  const handleDeleteTask = useCallback(
    async (taskId: string) => {
      try {
        setLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        toast({
          title: "Success",
          description: "Task has been deleted successfully!",
        })
      } catch (err) {
        setError("Failed to delete task. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [toast],
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
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTasks.map((task) => (
          <Card key={task.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{task.title}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-semibold",
                    task.difficultyLevel === "Easy" && "bg-green-100 text-green-800",
                    task.difficultyLevel === "Medium" && "bg-yellow-100 text-yellow-800",
                    task.difficultyLevel === "Hard" && "bg-red-100 text-red-800",
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
              <Button className="flex-1" onClick={() => handleJoinTask(task.id)} disabled={loading}>
                Join Task
              </Button>
              {task.isPublisher && (
                <Button variant="destructive" size="icon" onClick={() => handleDeleteTask(task.id)} disabled={loading}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>{selectedTask?.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

