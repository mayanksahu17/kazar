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

    // Filter out null or empty members
    const memberUsernames = [members.player1, members.player2, members.player3, members.player4].filter(Boolean);

    // Query members
    const users = await User.find({ userName: { $in: memberUsernames } }).lean();

    // Validate members
    if (users.length !== memberUsernames.length) {
      return NextResponse.json({ success: false, message: "One or more members do not exist" }, { status: 200 });
    }

    // Validate leader
    const leaderUser = users.find(user => user.userName === leader);
    if (!leaderUser) {
      return NextResponse.json({ success: false, message: "Leader must be one of the team members" }, { status: UNAUTHORIZED });
    }

    // Create team with dynamic number of players
    const teamData = {
      teamName,
      player1: members.player1 || null,
      player2: members.player2 || null,
      player3: members.player3 || null,
      player4: members.player4 || null,
      leader: leader,
    };
    const team = await Teams.create(teamData);

    // Update the members' teams array
    for (const member of memberUsernames) {
      await User.findOneAndUpdate({ userName: member }, { $push: { teams: team._id } });
    }

    return NextResponse.json({ success: true, message: "Team created successfully" }, { status: SUCCESS });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: SERVER_ERROR });
  }
}
