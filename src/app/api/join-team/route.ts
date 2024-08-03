import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Team, Teams } from "@/model/Teams";
import { User } from "@/model/User";
import { jwtVerify } from "jose";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        
        if (!token || token === "") {
            return NextResponse.json({ message: "Unauthorized" , Token : token }, { status: 401 });
        }
        
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
        await dbConnect();

        const userId = payload.id as string;
        const user = await User.findById(userId).lean();
        
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        let body;
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
        }
        // const formdata = await req.formData()
        // const teamId = formdata.get("teamId") as string;
        const { teamId } = body as { teamId: string };

        if (!teamId) {
            return NextResponse.json({ message: "Team ID is required" }, { status: 400 });
        }
        const team  = await Teams.findById(teamId).lean()
        
        // console.log(team.player1);
        
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        // Check if the user is already a member of the te̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥am
        const isMember = [team.player1, team.player2, team.player3, team.player4].some(player => player?.toString() === user._id.toString());

        if (isMember) {
            return NextResponse.json({ message: "User is already a member of this team" }, { status: 400 });
        }

        // Check each slot individually and find the first available one
        let availableSlot: string | null = null;
        if (!team.player1) availableSlot = "player1";
        else if (!team.player2) availableSlot = "player2";
        else if (!team.player3) availableSlot = "player3";
        else if (!team.player4) availableSlot = "player4";

        if (!availableSlot) {
            return NextResponse.json({ message: "Team is full" }, { status: 400 });
        }

        // Update the team with the new player
        const update = { [availableSlot]: new Types.ObjectId(userId) };
        const updatedTeam = await Teams.findByIdAndUpdate(teamId, update, { new: true });

        return NextResponse.json({
            success: true,
            message: "User added to the team successfully",
            data: updatedTeam
        }, { status: 200 });

    } catch (error : any) {
        console.error(error);
        return NextResponse.json({
            status: false,
            message: "Something went wrong",
            error: error.message
        }, { status: 500 });
    }
}
