import { NextRequest, NextResponse } from "next/server";
import { student } from "@/model/Student";
import { getUserFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user || user.role !== "student") {
    return NextResponse.json({ success: false, error: "Access Denied" }, { status: 403 });
  }

  try {
    const { enrollmentNumber, year, section, profile } = await req.json();

    const Student = await student.findOneAndUpdate(
      { userId: user._id },
      { enrollmentNumber, year, section, profile },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, Student });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
