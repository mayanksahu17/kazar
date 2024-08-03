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

    // Retrieve data from request body
    const { teamName, members, leader, token } = await req.json();

    // Check if token is present
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

    // Check if team already exists
    const existingTeam = await Teams.findOne({ teamName }).lean();
    if (existingTeam) {
      return NextResponse.json({ success: false, message: "Team with the same name already exists" }, { status: UNAUTHORIZED });
    }

    // Query members
    const memberUsernames = [members.player1, members.player2, members.player3, members.player4];
    const users = await User.find({ userName: { $in: memberUsernames } }).lean();

    // Validate members
    if (users.length !== memberUsernames.length) {
      return NextResponse.json({ success: false, message: "One or more members do not exist" }, { status: UNAUTHORIZED });
    }

    // Validate leader
    const leaderUser = users.find(user => user.userName === leader);
    if (!leaderUser) {
      return NextResponse.json({ success: false, message: "Leader must be one of the team members" }, { status: UNAUTHORIZED });
    }

    // Create team
    const team = await Teams.create({
      teamName,
      player1: members.player1,
      player2: members.player2,
      player3: members.player3,
      player4: members.player4,
      leader: leader,
    });

    // Update the members's teams array
    await User.findOneAndUpdate({userName : members.player1}, { $push: { teams: team._id }})
    await User.findOneAndUpdate({userName : members.player2}, { $push: { teams: team._id }})
    await User.findOneAndUpdate({userName : members.player3}, { $push: { teams: team._id }})
    await User.findOneAndUpdate({userName : members.player4}, { $push: { teams: team._id }})

    return NextResponse.json({ success: true, message: "Team created successfully" }, { status: SUCCESS });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: SERVER_ERROR });
  }
}

