"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Assignment {
  _id: string;
  scorePoints: number;
  difficultyLevel: string;
  deadline: string;
  taskContent: string;
  joiners: string[];
  submissions: string[];
}

interface StudentDetails {
  enrollmentNumber: string;
  year: number;
  section: string;
  name: string;
}

interface Submission {
  _id: string;
  status: "pending" | "complete" | "rejected";
  submittedAt: string;
  submittedContent: string;
  studentDetails: StudentDetails;
  taskDetails: {
    scorePoints: number;
    difficultyLevel: string;
    deadline: string;
    taskContent: string;
  };
}

const ViewTask = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

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

  const fetchSubmissions = async (taskId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/submissions/${taskId}`);
      setSubmissions(response.data.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubmissionStatus = async (taskId: string, studentId: string, newStatus: string) => {
    try {
      await axios.patch(`/api/submissions/${taskId}`, {
        studentId,
        status: newStatus,
      });
      fetchSubmissions(taskId);
    } catch (error) {
      console.error("Error updating submission status:", error);
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    try {
      await axios.delete(`/api/submissions/${submissionId}`);
      setSubmissions(submissions.filter(submission => submission._id !== submissionId));
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-green-500 to-blue-600 rounded-lg shadow-lg text-black">
      <Button onClick={() => router.back()} variant="outline" size="sm" className="mb-4 flex items-center gap-2 text-black border-white hover:border-green-300">
        <ArrowLeft className="h-4 w-4 text-black" /> Back
      </Button>

      <Card className="mb-6 bg-white rounded-lg shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-blue-600 font-bold text-xl">Task Details</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.map((task) => (
            <div key={task._id} className="p-4 mb-4 bg-green-100 border-l-4 border-green-500 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-600">Task Content: {task.taskContent}</h3>
              <p className="mt-2 text-sm text-black">Score Points: {task.scorePoints}</p>
              <p className="mt-2 text-sm text-black">Difficulty Level: {task.difficultyLevel}</p>
              <p className="mt-2 text-sm text-black">Joiners: {task.joiners.length}</p>
              <p className="mt-2 text-sm text-black">Submitted Students: {submissions.length}</p>
              <Button
                onClick={() => { setSelectedTask(task._id); fetchSubmissions(task._id); }}
                className="mt-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                View Submissions
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedTask && (
        <Card className="bg-white rounded-lg shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-blue-600 font-bold text-xl">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <p className="text-gray-500">Loading...</p> : submissions.length === 0 ? <p className="text-gray-500">No submissions yet.</p> : (
              submissions.map((submission) => (
                <div key={submission._id} className="p-4 mb-4 bg-green-50 border-l-4 border-green-300 rounded-lg shadow-sm">
                  <p className="font-semibold text-blue-600">Submission ID: {submission._id}</p>
                  <p className="text-sm text-black">Content: {submission.submittedContent}</p>
                  <p className="mt-2 text-sm text-gray-600">Status: <Badge className={`bg-${submission.status === 'pending' ? 'yellow' : submission.status === 'complete' ? 'green' : 'red'}-500 text-white`}>{submission.status}</Badge></p>
                  {submission.status === "pending" && (
                    <div className="mt-4 flex gap-4">
                      <Button
                        onClick={() => updateSubmissionStatus(selectedTask, submission.studentDetails.enrollmentNumber, "complete")}
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        Verify
                      </Button>
                      <Button
                        onClick={() => updateSubmissionStatus(selectedTask, submission.studentDetails.enrollmentNumber, "rejected")}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  <div className="mt-2">
                    <Button
                      onClick={() => deleteSubmission(submission._id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete Submission
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ViewTask;
