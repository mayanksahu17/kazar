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
  submissions: string[];
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
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/task');
      setAssignments(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchSubmissions = async (submissionIds: any) => {
    try {
      const response = await axios.post('/api/submissions', {submissionIds  });
      setSubmissions(response.data); // Assuming API returns an array of submissions
    } catch (error : any) {
      console.error('Error fetching submissions:', error);
    }
  };

  const verifySubmission = async (taskId: string, studentId: string) => {
    try {
      await axios.patch(`/api/task/prof-verify`, { 
        taskId, 
        studentId, 
        status: 'graded' 
      });
      fetchAssignments();
    } catch (error) {
      console.error('Error verifying submission:', error);
    }
  };

  return (
    <div className="mt-6 p-6 max-w-3xl mx-auto bg-gradient-to-b from-gray-50 to-white rounded-lg shadow-md">
      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        className="mb-4 flex items-center gap-2 bg-white hover:bg-gray-100 transition-all text-black"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Assignments Heading */}
      <h2 className="text-2xl font-bold mb-5 text-center text-black">Assignments</h2>

      {/* Assignments List */}
      <ul className="space-y-4">
        {assignments.map((task) => (
          <li key={task._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg text-black">
                {task.taskContent} <span className="text-sm text-gray-700">({task.difficultyLevel})</span>
              </h3>
              <p className="text-sm text-black">
                Task ID: <span className="font-medium">{task._id}</span>
              </p>
              <p className="text-sm text-black">
                Joiners: <span className="font-medium">{task.joiners.length}</span>
              </p>
              <p className="text-sm text-black">
                Submissions: <span className="font-medium">{task.submissions.length}</span>
              </p>
            </div>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" 
              onClick={() => {
                setSelectedTask(task._id);
                fetchSubmissions(task._id); // Fetch submissions when task is selected
              }}
            >
              View Submissions
            </button>
          </li>
        ))}
      </ul>

      {/* Submissions Section */}
      {selectedTask && (
        <div className="mt-6 p-5 bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-black">Submissions</h2>
          <ul className="space-y-4">
          {submissions && Array.isArray(submissions) && submissions.map((submission) => (
              <li key={submission._id} className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all flex justify-between items-center">
                <div>
                  <p className="text-sm text-black"><strong>Student ID:</strong> {submission.student}</p>
                  <p className="text-sm text-black"><strong>Content:</strong> {submission.submittedContent}</p>
                  <p className={`text-sm font-medium ${submission.status === 'pending' ? 'text-red-600' : 'text-green-600'}`}>
                    <strong>Status:</strong> {submission.status}
                  </p>
                </div>
                {submission.status === 'pending' && (
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-all" 
                    onClick={() => verifySubmission(selectedTask, submission.student)}
                  >
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
