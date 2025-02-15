import { NextResponse  , NextRequest} from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Task } from "@/model/Task";
import { getUserFromToken } from "@/utils/auth";

import { Submission } from "@/model/Submisstion";


export async function PATCH(req: NextRequest) {
  await dbConnect();
  
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { taskId } = await req.json();
    const task = await Task.findById(taskId);
    console.log("task Id",taskId);
    console.log("task ",task);

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
    }

    if (task.joiners.includes(user._id as string)) {
      return NextResponse.json({ success: false, message: "Already joined this task" }, { status: 400 });
    }

    task.joiners.push(user._id as string);
    await task.save();

    return NextResponse.json({ success: true, message: "Joined task successfully", userId: user._id });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { taskId, submittedContent } = await req.json();
    const task = await Task.findById(taskId);

    console.log("task Id",taskId);

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
    }

    if (!task.joiners.includes(user._id as string)) {
      return NextResponse.json({ success: false, message: "You must join the task first" }, { status: 400 });
    }

    const submission = await Submission.create({
      task: taskId,
      student: user._id,
      submittedContent,
      submissionDate: new Date(),
      status: "pending",
    });

    return NextResponse.json({ success: true, message: "Task submitted successfully", data: submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
