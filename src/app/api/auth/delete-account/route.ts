import { User } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    // Extract Bearer token from the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
    const userId = payload.id as string;

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: UNAUTHORIZED });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    }, { status: SUCCESS });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Error deleting user",
      data: error.message
    }, { status: SERVER_ERROR });
  }
}
