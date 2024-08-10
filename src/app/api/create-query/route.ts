import { Contact } from "@/model/Contact";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { jwtVerify } from "jose";

// Constants for status codes
const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token, name, email, message } = await req.json();

    if (!token || token === "") {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    // Verify JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
    const userId = payload.id as string;

    // Find the user by ID
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    // Create a new contact entry
    const contact = await Contact.create({
      name,
      email,
      message,
      user: user.userName, // Linking the message to the user who sent it
    });

    return NextResponse.json({ message: "Message sent successfully", contact }, { status: SUCCESS });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: SERVER_ERROR });
  }
}
