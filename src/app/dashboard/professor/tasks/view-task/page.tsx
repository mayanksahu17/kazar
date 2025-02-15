'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

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

const ViewTask: React.FC = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
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

  const verifySubmission = async (submissionId: string) => {
    try {
      await axios.put(`/api/submissions/${submissionId}`, { status: 'graded' });
      fetchAssignments();
    } catch (error) {
      console.error('Error verifying submission:', error);
    }
  };

  return (
    <div className="mt-6 p-6 max-w-3xl mx-auto bg-gradient-to-b from-blue-50 to-white rounded-lg shadow-md">
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

      {/* Assignments Heading */}
      <h2 className="text-2xl font-bold text-blue-600 mb-5 text-center">Assignments</h2>

      {/* Assignments List */}
      <ul className="space-y-4">
        {assignments.map((task) => (
          <li key={task._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{task.taskContent} <span className="text-sm text-gray-500">({task.difficultyLevel})</span></h3>
              <p className="text-sm text-gray-600">Task ID: <span className="font-medium text-gray-700">{task._id}</span></p>
              <p className="text-sm text-gray-600">Joiners: <span className="font-medium text-green-600">{task.joiners.length}</span></p>
              <p className="text-sm text-gray-600">Submissions: <span className="font-medium text-blue-600">{task.submissions.length}</span></p>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" onClick={() => setSelectedTask(task._id)}>
              View Submissions
            </button>
          </li>
        ))}
      </ul>

      {/* Submissions Section */}
      {selectedTask && (
        <div className="mt-6 p-5 bg-gradient-to-b from-white to-blue-50 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Submissions</h2>
          <ul className="space-y-4">
            {assignments.find((task) => task._id === selectedTask)?.submissions.map((submission) => (
              <li key={submission._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-700"><strong>Student ID:</strong> {submission.student}</p>
                  <p className="text-sm text-gray-700"><strong>Content:</strong> {submission.submittedContent}</p>
                  <p className={`text-sm font-medium ${submission.status === 'pending' ? 'text-red-600' : 'text-green-600'}`}><strong>Status:</strong> {submission.status}</p>
                </div>
                {submission.status === 'pending' && (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" onClick={() => verifySubmission(submission._id)}>
                    Verify
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewTask;
