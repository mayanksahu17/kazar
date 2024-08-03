import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/User";
import { Teams } from "@/model/Teams";
import { jwtVerify } from "jose";

// Constants for status codes
const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    console.log("deleting the team");
    

    // Retrieve data from request body
    const { teamId, token } = await req.json();

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

    // Find the team by ID
    const team = await Teams.findById(teamId).lean();
    if (!team) {
      return NextResponse.json({ message: "Team not found" }, { status: NOT_FOUND });
    }

    // Remove the team from the Teams collection
    await Teams.findByIdAndDelete(teamId);

    // Remove the team from each member's teams array
    const memberUsernames = [team.player1, team.player2, team.player3, team.player4];
    await User.updateMany(
      { userName: { $in: memberUsernames } },
      { $pull: { teams: teamId } }
    );

    return NextResponse.json({ success: true, message: "Team deleted successfully" }, { status: SUCCESS });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: SERVER_ERROR });
  }
}
