import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth"; // Extracts user ID from token
import dbConnect from "@/lib/dbConnect";
import { professor } from "@/model/Professor"; // Ensure Professor model exists

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

    const Professor = await professor.findById(userId).select("teachingSchedule assignments");
    if (!professor) {
      return NextResponse.json({ success: false, message: "Professor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: Professor }, { status: 200 });
  } catch (error) {
    console.error("Error fetching professor dashboard:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
