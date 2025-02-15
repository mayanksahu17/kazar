'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const CreateTask: React.FC = () => {
  const router = useRouter()

  const [newAssignment, setNewAssignment] = useState({
    scorePoints: '',
    difficultyLevel: 'medium',
    deadline: '',
    taskContent: '',
  });

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

      setNewAssignment({ scorePoints: '', difficultyLevel: 'medium', deadline: '', taskContent: '' });

    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          className="mb-4 flex items-center gap-2 bg-white hover:bg-gray-100 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-600 mb-5 text-center">Create Assignment</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition-all"
            type="text"
            placeholder="Task Content"
            value={newAssignment.taskContent}
            onChange={(e) => setNewAssignment({ ...newAssignment, taskContent: e.target.value })}
          />

          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition-all"
            type="number"
            placeholder="Score Points"
            value={newAssignment.scorePoints}
            onChange={(e) => setNewAssignment({ ...newAssignment, scorePoints: e.target.value })}
          />

          <select
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-600 transition-all"
            value={newAssignment.difficultyLevel}
            onChange={(e) => setNewAssignment({ ...newAssignment, difficultyLevel: e.target.value })}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <input
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition-all"
            type="datetime-local"
            value={newAssignment.deadline}
            onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-5 p-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all shadow-md font-semibold"
          onClick={createAssignment}
        >
          Create Assignment
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
