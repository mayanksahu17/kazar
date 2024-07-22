import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Teams } from "@/model/Teams";
import { User } from "@/model/User";
import { jwtVerify } from "jose";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        
        if (!token || token === "") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string)); 
        await dbConnect();
        
        const userId = payload.id as string;
        const user = await User.findById(userId).lean();
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        const { teamName } = await req.json() as { teamName: string };
        
        const team = await Teams.create({
            teamName,
            leader: new Types.ObjectId(userId),
            player1: new Types.ObjectId(userId),
            registered: false,
        });
        
        if (!team) {
            return NextResponse.json({ message: "Failed to create team" }, { status: 400 });
        } else {
            return NextResponse.json({
                success: true,
                message: "Team created successfully",
                data: team
            }, { status: 200 });
        }
        
    } catch (error : any) {
        console.error(error);
        return NextResponse.json({
            status: false,
            message: "Something went wrong",
            error: error.message
        }, { status: 500 });
    }
}
