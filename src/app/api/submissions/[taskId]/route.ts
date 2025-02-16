import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Task } from "@/model/Task";
import { Student } from "@/model/Student";

export async function POST(req: NextRequest, { params }: { params: { taskId: string } }) {
    await dbConnect();
    const { taskId } = params;
    const { studentId } = await req.json();

    if (!studentId) {
        return NextResponse.json({ success: false, message: "Student ID is required" }, { status: 400 });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }

        const existingSubmission = task.submissions.find((sub) => sub.studentId === studentId);
        if (existingSubmission) {
            return NextResponse.json({ success: false, message: "Task already submitted" }, { status: 400 });
        }

        task.submissions.push({ studentId, status: "pending", submittedAt: new Date() });
        await task.save();
        return NextResponse.json({ success: true, message: "Task submitted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
    await dbConnect();
    const { taskId } = params;
    const { studentId, status } = await req.json();

    if (!studentId || !["pending", "complete", "rejected"].includes(status)) {
        return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
        }

        const submission = task.submissions.find((sub) => sub.studentId === studentId);
        if (!submission) {
            return NextResponse.json({ success: false, message: "Submission not found" }, { status: 404 });
        }

        submission.status = status;
        await task.save();
        return NextResponse.json({ success: true, message: "Submission status updated" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { taskId: string } }) {
    await dbConnect();
    const { taskId } = params;

    if (req.method === "GET") {
        try {
            const task = await Task.findById(taskId).populate("publisher", "name email");
            if (!task) {
                return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
            }
            console.log(task);
            
            const submissionsWithDetails = await Promise.all(
                task.submissions.map(async (submission) => {
                    const student = await Student.findById(submission.studentId).select("profile enrollmentNumber name");
                    return {
                        _id: submission._id,
                        studentDetails: {
                            name: student?.name || "Unknown",
                            enrollmentNumber: student?.enrollmentNumber || "N/A",
                        },
                        status: submission.status,
                        submittedAt: submission.submittedAt,
                        submittedContent: submission.submittedContent,
                    };
                })
            );

            return NextResponse.json({
                success: true,
                submissions: submissionsWithDetails,
            });
        } catch (error) {
            return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
        }
    }
}