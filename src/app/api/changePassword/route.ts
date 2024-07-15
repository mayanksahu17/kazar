import { getUser } from "@/helpers/getUser";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/model/User";
import bcryptjs from "bcryptjs";
import validator from "validator";
import { jwtVerify } from 'jose'; 
export async function POST(req: NextRequest) {
  try {
  const { newPassword , token } = await req.json();
  // const token = req.cookies.get('token')?.value;
 
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log("payload : " , payload );
    console.log("payload : " , payload.id );
    
    const userId    = payload.id
  
  

  // Input validation
  if (!validator.isStrongPassword(newPassword)) {
    return NextResponse.json({ message: "Password is not strong enough" }, { status: 400 });
  }

  // Get user information securely
 
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Hash the new password
  const saltRounds = 12; // Consider increasing salt rounds for stronger security
  const hashedPassword = await bcryptjs.hash(newPassword, saltRounds);
  // console.log( "this is user " ,user);
  
  
  // Update user password securely
  

    const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword });
    console.log(updatedUser);
    
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ message: "Error updating password" }, { status: 500 });
  }
}
