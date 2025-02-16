import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { Task } from "@/model/Task";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { taskId } = req.query;

    if (req.method === "POST") {
        // Student submits a task
        const { studentId } = req.body;
        console.log("prof route studentId : ", studentId);

        if (!studentId) {
            return res.status(400).json({ success: false, message: "Student ID is required" });
        }

        try {
            const task = await Task.findById(taskId);
            console.log("prof route taskId : ", taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            // Check if student is already in submissions
            const existingSubmission = task.submissions.find((sub:any) => sub.studentId === studentId);

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
        // Professor updates submission status
        const { studentId, status } = req.body;

        if (!studentId || !["pending", "complete", "rejected"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        try {
            const task = await Task.findById(taskId);

            if (!task) {
                return res.status(404).json({ success: false, message: "Task not found" });
            }

            const submission = task.submissions.find((sub:any) => sub.studentId === studentId);

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

    return res.status(405).json({ success: false, message: "Method not allowed" });
}
