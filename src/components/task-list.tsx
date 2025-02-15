"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  taskContent: string;
  difficultyLevel: string;
  deadline: string;
  scorePoints: number;
  joiners: string[];
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/task", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setTasks(data.data);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Handle joining a task
  const handleJoinTask = async (taskId: string) => {
    if (!token) return alert("You must be logged in to join a task");

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
      if (data.success) {
        alert("Joined the task successfully!");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, joiners: [...task.joiners, data.userId] } : task
          )
        );
        setUserId(data.userId);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error joining task", error);
    } finally {
      setLoading(null);
    }
  };

  // Handle submitting a task
  const handleSubmitTask = async (taskId: string) => {
    if (!token) return alert("You must be logged in to submit a task");

    setLoading(taskId);
    try {
      const res = await fetch("/api/studenttasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId, submittedContent: "My submission" }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Task submitted successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting task", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Tasks</h1>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => {
            const isJoined = userId && task.joiners.includes(userId);

            return (
              <li key={task._id} className="border p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">{task.taskContent}</h2>
                <p className="text-sm text-gray-500">
                  Difficulty: {task.difficultyLevel} | Points: {task.scorePoints}
                </p>

                {!isJoined ? (
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                    onClick={() => handleJoinTask(task._id)}
                    disabled={loading === task._id}
                  >
                    {loading === task._id ? "Joining..." : "Join Task"}
                  </button>
                ) : (
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => handleSubmitTask(task._id)}
                    disabled={loading === task._id}
                  >
                    {loading === task._id ? "Submitting..." : "Submit Task"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
