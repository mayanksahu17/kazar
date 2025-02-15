import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/model/Student";
import { getUserFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    try {
      console.log("Incoming request to /api/profile/student");
  
      const user = await getUserFromToken(req);
      if (!user || user.role !== "student") {
        console.log("Unauthorized access attempt", user);
        return NextResponse.json({ success: false, error: "Access Denied" }, { status: 403 });
      }
  
      const body = await req.json();
      console.log("Request Body:", body);
  
      const { enrollmentNumber, year, section, profile } = body;
  
      const updatedStudent = await Student.findOneAndUpdate(
        { userId: user._id },
        { enrollmentNumber, year, section, profile },
        { new: true, upsert: true }
      );
  
      return NextResponse.json({ success: true, student: updatedStudent });
    } catch (error: any) {
      console.error("Error in /api/profile/student:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  