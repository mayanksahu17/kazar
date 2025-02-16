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
  submissions: string[];
  joiners: string[];
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Button onClick={() => router.back()} variant="outline" size="sm" className="mb-4 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.map((task) => (
            <div key={task._id} className="p-4 border rounded-lg">
              <h3>{task.taskContent}</h3>
              <Button onClick={() => { setSelectedTask(task._id); fetchSubmissions(task._id); }}>View Submissions</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedTask && (
        <Card>
          <CardHeader><CardTitle>Submissions</CardTitle></CardHeader>
          <CardContent>
            {loading ? <p>Loading...</p> : submissions.length === 0 ? <p>No submissions yet.</p> : (
              submissions.map((submission) => (
                <div key={submission._id} className="p-4 border rounded-lg">
                  <p><strong>{submission.studentDetails.name}</strong> ({submission.studentDetails.enrollmentNumber})</p>
                  <p>Submitted: {new Date(submission.submittedAt).toLocaleString()}</p>
                  <p>Status: <Badge>{submission.status}</Badge></p>
                  <p>{submission.submittedContent}</p>
                  {submission.status === "pending" && (
                    <div>
                      <Button onClick={() => updateSubmissionStatus(selectedTask, submission.studentDetails.enrollmentNumber, "complete")}>Accept</Button>
                      <Button onClick={() => updateSubmissionStatus(selectedTask, submission.studentDetails.enrollmentNumber, "rejected")}>Reject</Button>
                    </div>
                  )}
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
