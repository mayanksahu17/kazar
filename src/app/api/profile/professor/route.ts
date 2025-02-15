import { NextRequest, NextResponse } from "next/server";
import { professor } from "@/model/Professor";
import { getUserFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user || user.role !== "professor") {
    return NextResponse.json({ success: false, error: "Access Denied" }, { status: 403 });
  }

  try {
    const { teachingExperience, subjects, achievements } = await req.json();

    const Professor = await professor.findOneAndUpdate(
      { userId: user._id },
      { teachingExperience, subjects, achievements },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, Professor });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
