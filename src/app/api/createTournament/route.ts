import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { getUser } from "@/helpers/getUser";
import { ObjectId } from 'mongodb';
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const {
      title,
      mode,
      map,
      winningPrice,
      eligibility,
      owner,
      lunchDate,
      requiredTeamSize,
      token,
      entryPrice,
      thumbNail
    } = await req.json();

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const userId = payload.id;

    // Input validations (enhanced for robustness)
    if (!title || !mode || !map || winningPrice === undefined || !eligibility || !owner || !lunchDate || !requiredTeamSize || !entryPrice || !thumbNail) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ... other validation checks

    // Check if user exists
    const userExists = await User.findById({ _id: userId });
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  

    // Create tournament
    const tournament = await Tournaments.create({
      title,
      mode,
      map,
      winningPrice,
      eligibility,
      owner: userId,
      lunchDate,
      requiredTeamSize,
      Collection :  0,
      entryPrice ,
      thumbNail
    });

 

    userExists.tournaments.push(tournament._id)

    const [savedTournament, savedUser] = await Promise.all([
      tournament.save(),
      userExists.save(),
     // Save the updated user document
    ]);

    return NextResponse.json({ message: "Tournament created successfully", data : savedTournament }, { status: 201 });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json({ message: "Error creating tournament" }, { status: 500 });
  }
}
