'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold">Faculty Dashboard</h2>
        <ul className="mt-5 space-y-2">
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Create Assignment</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">View Assignments</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Create Assignment */}
        <div className="bg-white p-5 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-3">Create Assignment</h2>
          <input className="w-full p-2 mb-2 border rounded" type="text" placeholder="Task Content" value={newAssignment.taskContent} onChange={(e) => setNewAssignment({ ...newAssignment, taskContent: e.target.value })} />
          <input className="w-full p-2 mb-2 border rounded" type="number" placeholder="Score Points" value={newAssignment.scorePoints} onChange={(e) => setNewAssignment({ ...newAssignment, scorePoints: e.target.value })} />
          <select className="w-full p-2 mb-2 border rounded" value={newAssignment.difficultyLevel} onChange={(e) => setNewAssignment({ ...newAssignment, difficultyLevel: e.target.value })}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input className="w-full p-2 mb-2 border rounded" type="datetime-local" value={newAssignment.deadline} onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })} />
          <button className="bg-blue-600 text-white p-2 rounded w-full" onClick={createAssignment}>Create</button>
        </div>

        {/* List Assignments */}
        <div className="mt-6 bg-white p-5 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-3">Assignments</h2>
          <ul>
            {assignments.map((task) => (
              <li key={task._id} className="p-3 border-b flex justify-between items-center">
                <div>
                  <strong>{task.taskContent}</strong> ({task.difficultyLevel})
                  <p>Task ID: {task._id}</p>
                  <p>Joiners: {task.joiners.length}</p>
                  <p>Submissions: {task.submissions.length}</p>
                </div>
                <button className="bg-green-600 text-white p-2 rounded" onClick={() => setSelectedTask(task._id)}>View Submissions</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Submissions for Selected Task */}
        {selectedTask && (
          <div className="mt-6 bg-white p-5 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">Submissions</h2>
            <ul>
              {assignments.find((task) => task._id === selectedTask)?.submissions.map((submission) => (
                <li key={submission._id} className="p-3 border-b flex justify-between items-center">
                  <div>
                    <p>Student ID: {submission.student}</p>
                    <p>Content: {submission.submittedContent}</p>
                    <p>Status: {submission.status}</p>
                  </div>
                  {submission.status === 'pending' && (
                    <button className="bg-red-600 text-white p-2 rounded" onClick={() => verifySubmission(submission._id)}>Verify</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
