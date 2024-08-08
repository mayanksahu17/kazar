import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User";
import { Teams } from "@/model/Teams";
import { jwtVerify } from "jose";

// Constants for status codes
const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json();

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

    // Retrieve all teams associated with the user
    const teams = await Teams.find({ _id: { $in: user.teams } }).lean();
    
    // Extract team names
    const teamNames = teams.map((team) =>  { if(team.leader === user.userName) { return team.teamName } else { return null;}});

    return NextResponse.json({ success: true, teams, teamNames }, { status: SUCCESS });

    

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: SERVER_ERROR });
  }
}
