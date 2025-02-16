import dbConnect from '@/lib/dbConnect';
import { Submission1 } from '@/model/Submisstion';
import { Task } from '@/model/Task';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/utils/auth';
import mongoose from 'mongoose';


// ✅ Get a specific submission by ID
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { submissionIds } = await req.json();
    
    if (!submissionIds) {
      return NextResponse.json(
        { success: false, message: "Submission ID is required" },
        { status: 400 }
      );
    }
    console.log(submissionIds);
    
    // Fetch submission details by ID
    const submission = await Submission1.findOne({task : submissionIds});
    console.log(submission);
    
    if (!submission) {
      return NextResponse.json(
        { success: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: submission });
  } catch (error: any) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
