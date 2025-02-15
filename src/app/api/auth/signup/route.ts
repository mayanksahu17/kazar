import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcryptjs";
import { User } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userName, email, password, mobileNumber, role } = await req.json();

    if (!userName || !email || !password || !mobileNumber || !role) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      mobileNumber,
      role,
      verifyCode: Math.floor(100000 + Math.random() * 900000).toString(), // 6-digit verification code
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, userName: newUser.userName, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully!",
      token,
      role: newUser.role, 
      userId: newUser._id, 
    });

    response.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600,
        path: "/",
      })
    );

    return response;
  } catch (error: any) {
    console.error("Error signing up user", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error signing up user",
      },
      { status: 500 }
    );
  }
}
