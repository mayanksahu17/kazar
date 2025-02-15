import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth"; // Helper to extract token
import dbConnect from "@/lib/dbConnect";
import {Student} from "@/model/Student"; // Assuming Student model exists

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect(); // Ensure database is connected

  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const userId = getUserFromToken(req); // Extract user ID from token
    if (!userId) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const student = await Student.findById(userId).select("enrolledCourses events");
    if (!Student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student }, { status: 200 });
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}