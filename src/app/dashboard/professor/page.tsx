'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Assignment {
  _id: string;
  scorePoints: number;
  difficultyLevel: string;
  deadline: string;
  taskContent: string;
  submissions: Submission[];
  joiners: string[];
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
    scorePoints: '',
    difficultyLevel: 'medium',
    deadline: '',
    taskContent: '',
  });
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/task');
      setAssignments(response.data.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const createAssignment = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      await axios.post('/api/task', newAssignment, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  const verifySubmission = async (submissionId: string) => {
    try {
      await axios.put(`/api/submissions/${submissionId}`, { status: 'graded' });
      fetchAssignments();
    } catch (error) {
      console.error('Error verifying submission:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-50 to-green-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-blue-600 to-green-500 text-white p-6 shadow-lg">
        <h2 className="text-3xl font-bold tracking-wide text-center">Faculty Dashboard</h2>
        <ul className="mt-6 space-y-4">
          <li className="p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
            <Link href='/dashboard/professor/tasks/create-task' className="block text-lg font-medium">
              ➕ Create Assignment
            </Link>
          </li>
          <li className="p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
            <Link href='/dashboard/professor/tasks/view-task' className="block text-lg font-medium">
              📜 View Assignments
            </Link>
          </li>
        </ul>
      </div>

      {/* Content Placeholder */}
      <div className="flex-1 flex justify-center items-center text-gray-700">
        <h2 className="text-2xl font-semibold">Select an option from the sidebar.</h2>
      </div>
    </div>
  );
};

export default FacultyDashboard;
