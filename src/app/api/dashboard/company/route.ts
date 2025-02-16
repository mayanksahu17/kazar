import { NextResponse } from "next/server";
import { getUserFromToken } from "@/utils/auth";
import dbConnect from "@/lib/dbConnect";
import { Company } from "@/model/Company";
import { NextRequest } from "next/server";
import { User } from "@/model/User";
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Assuming the user has a companyId field that references their company
    const companyData = await Company.findOne({userId: user._id})
      

    if (!companyData) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: companyData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching company dashboard:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}