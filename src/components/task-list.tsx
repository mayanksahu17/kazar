"use client";
// import TaskSubmissionForm from "./TaskSubmissionForm";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Task {
  _id: string;
  taskContent: string;
  difficultyLevel: string;
  deadline: string;
  scorePoints: number;
  joiners: string[];
  isSubmitted?: boolean;
}

interface Submission {
  task: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [submittingTaskId, setSubmittingTaskId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initialize token and userId
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  // Fetch tasks and submissions
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      setError(null);

      try {
        // Fetch tasks
        const tasksRes = await fetch("/api/task", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!tasksRes.ok) throw new Error("Failed to fetch tasks");

        const tasksData = await tasksRes.json();

        // Fetch submissions
        const submissionsRes = await fetch("/api/studenttasks", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!submissionsRes.ok) throw new Error("Failed to fetch submissions");

        const submissionsData = await submissionsRes.json();

        if (tasksData.success && submissionsData.success) {
          const submittedTaskIds = submissionsData.data.map(
            (sub: Submission) => sub.task
          );

          setSubmissions(submissionsData.data);

          const tasksWithSubmissions = tasksData.data.map((task: Task) => ({
            ...task,
            isSubmitted: submittedTaskIds.includes(task._id),
          }));

          setTasks(tasksWithSubmissions);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleJoinTask = async (taskId: string) => {
    if (!token) {
      setError("You must be logged in to join a task");
      return;
    }

    setLoading(taskId);
    try {
      const res = await fetch("/api/studenttasks", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to join task");

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, joiners: [...task.joiners, data.userId] }
              : task
          )
        );
        setUserId(data.userId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join task");
    } finally {
      setLoading(null);
    }
  };

  const handleSubmitTask = async (taskId: string, submittedContent: string) => {
    if (!token) {
      setError("You must be logged in to submit a task");
      return;
    }

    setLoading(taskId);
    try {
      const res = await fetch("/api/studenttasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId, submittedContent }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit task");

      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, isSubmitted: true } : task
          )
        );
        setSubmissions((prev) => [
          ...prev,
          {
            task: taskId,
            submissionDate: new Date().toISOString(),
            status: "pending",
          },
        ]);
        setSubmittingTaskId(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit task");
    } finally {
      setLoading(null);
    }
  };

  // Sort tasks: unsubmitted first, then by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isSubmitted !== b.isSubmitted) return a.isSubmitted ? 1 : -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <div className="flex items-center justify-between w-full">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 bg-white hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold mb-6 text-center">Available Tasks</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {sortedTasks.map((task) => {
              const isJoined = userId && task.joiners.includes(userId);
              const submission = submissions.find((s) => s.task === task._id);

              return (
                <li
                  key={task._id}
                  className={`border p-4 rounded-lg shadow transition-all duration-200 ${
                    task.isSubmitted ? "bg-gray-50" : "hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{task.taskContent}</h2>
                      <p className="text-sm text-gray-500">
                        Difficulty: {task.difficultyLevel} | Points: {task.scorePoints}
                      </p>
                      <p className="text-sm text-gray-500">
                        Deadline: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
