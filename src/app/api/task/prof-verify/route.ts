import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { Task } from "@/model/Task";
import { Student } from "@/model/Student";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { taskId } = req.query;

    if (req.method === "POST") {
        const { studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ success: false, message: "Student ID is required" });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            const existingSubmission = task.submissions.find((sub) => sub.studentId === studentId);
            if (existingSubmission) {
                return res.status(400).json({ success: false, message: "Task already submitted" });
            }

            task.submissions.push({ studentId, status: "pending", submittedAt: new Date() });
            await task.save();
            return res.status(200).json({ success: true, message: "Task submitted successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    if (req.method === "PATCH") {
        const { studentId, status } = req.body;
        if (!studentId || !["pending", "complete", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        try {
            const task = await Task.findById(taskId);
            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            const submission = task.submissions.find((sub) => sub.studentId === studentId);
            if (!submission) {
                return res.status(404).json({ success: false, message: "Submission not found" });
            }

            submission.status = status;
            await task.save();

            return res.status(200).json({ success: true, message: "Submission status updated" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    if (req.method === "GET") {
        try {
            const task = await Task.findById(taskId).populate("publisher", "name email");
            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            const submissionsWithDetails = await Promise.all(
                task.submissions.map(async (submission) => {
                    const student = await Student.findById(submission.studentId).select("profile enrollmentNumber");
                    return { _id: submission._id, student, taskStatus: task.status, status: submission.status, submittedAt: submission.submittedAt };
                })
            );

            return res.status(200).json({
                success: true,
                submissions: submissionsWithDetails,
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
}
