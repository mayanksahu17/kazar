import { NextRequest, NextResponse } from "next/server";
import { company } from "@/model/Company";
import { getUserFromToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const user = await getUserFromToken(req);
  if (!user || user.role !== "company") {
    return NextResponse.json({ success: false, error: "Access Denied" }, { status: 403 });
  }

  try {
    const { name, industry, internships } = await req.json();

    const Company = await company.findOneAndUpdate(
      { userId: user._id },
      { name, industry, internships },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, Company });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
