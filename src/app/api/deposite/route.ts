import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/middlewares/authMiddleware";

export async function POST(req:NextRequest) {

    const { email } = await req.json();

    
    return NextResponse.json({
        message : "fooo",
        email : email
  
    })
    
}