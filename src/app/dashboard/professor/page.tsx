"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Assignment {
  _id: string;
  scorePoints: number;
  difficultyLevel: string;
  deadline: string;
  taskContent: string;
  submissions: Submission[];
  joiners: string[];
}

interface Task {
  id: string;  // or number, depending on your data
  feedback?: string;
  status?: string;
}


interface Submission {
  _id: string;
  student: string;
  submittedContent: string;
  status: string;
}

const FacultyDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
 
  const [newAssignment, setNewAssignment] = useState({
    scorePoints: "",
    difficultyLevel: "medium",
    deadline: "",
    taskContent: "",
  });

  const [mentees, setMentees] = useState([
    { id: 1, name: "Alice Johnson", progress: 75, tasksCompleted: 15, tasksTotal: 20 },
    { id: 2, name: "Bob Smith", progress: 60, tasksCompleted: 12, tasksTotal: 20 },
    { id: 3, name: "Charlie Brown", progress: 90, tasksCompleted: 18, tasksTotal: 20 },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, menteeId: 1, title: "Implement a Binary Search Tree", status: "In Progress", feedback: "" },
    { id: 2, menteeId: 2, title: "Create a RESTful API", status: "Submitted", feedback: "" },
    { id: 3, menteeId: 3, title: "Develop a React Component", status: "Completed", feedback: "Great job!" },
  ]);

  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ menteeId: "", title: "", description: "" });
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("/api/task");
      setAssignments(response.data.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const createAssignment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.post("/api/task", newAssignment, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTaskId = tasks.length + 1;
    setTasks([...tasks, { id: newTaskId, menteeId: parseInt(newTask.menteeId), title: newTask.title, status: "Assigned", feedback: "" }]);
    setNewTask({ menteeId: "", title: "", description: "" });
  };

  const handleProvideFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTask && typeof selectedTask === "object" && "id" in selectedTask) {
      setTasks(tasks.map((task) => 
        task.id === selectedTask!.id ? { ...task, feedback, status: "Completed" } : task
      ));
      setSelectedTask(null);
      setFeedback("");
    }
  };

  const pieChartData = mentees.map((mentee) => ({
    name: mentee.name,
    value: mentee.progress,
  }));

  const barChartData = mentees.map((mentee) => ({
    name: mentee.name,
    completed: mentee.tasksCompleted,
    remaining: mentee.tasksTotal - mentee.tasksCompleted,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-green-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-600 to-green-500 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-bold tracking-wide text-center">Faculty Dashboard</h2>
        <ul className="mt-6 space-y-4">
          <li className="p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
            <Link href="/dashboard/professor/tasks/create-task" className="block text-lg font-medium">
              ➕ Create Assignment
            </Link>
          </li>
          <li className="p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
            <Link href="/dashboard/professor/tasks/view-task" className="block text-lg font-medium">
              📜 View Assignments
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-8">
          Faculty Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mentees Progress */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Faculty Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Task Completion */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Tasks Completion</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#0088FE" />
                <Bar dataKey="remaining" stackId="a" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
