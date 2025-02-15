import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import { Student } from "@/model/Student";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Authenticate user from JWT token
    const user = await getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profile } = await req.json();
    console.log("Profile received:", profile);

    if (!profile || typeof profile !== "object") {
      return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
    }

    // Validate required personal info fields
    const requiredPersonalFields = [
      "personalInfo.fullName",
      "personalInfo.email",
      "personalInfo.phone",
      "personalInfo.location",
      "personalInfo.github",
    ];

    for (const field of requiredPersonalFields) {
      const keys = field.split(".");
      let value = profile;

      for (const key of keys) {
        if (value && typeof value === "object") {
          value = value[key];
        } else {
          value = undefined;
          break;
        }
      }

      if (value === undefined || value === null) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Find the Student by user ID
    let student = await Student.findOne({ userId: user._id });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Update the profile directly within the Student document
    student.profile = profile;
    await student.save();
    console.log("Updated student profile:", JSON.stringify(student.profile, null, 2));

    return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}