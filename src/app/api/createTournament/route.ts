import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  await dbConnect();
  

  

  
  try {
    const {
      token,
      title,
      mode,
      map,
      winningPrice,
      eligibility,
      owner,
      launchDate,
      requiredTeamSize,
      entryPrice,
      thumbnail
    } = await req.json();

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "You are not logged in",
      }, {
        status: 203
      });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const userId = payload.id;

    if (!title || !mode || !map || winningPrice === undefined || !eligibility || !owner || !launchDate || !requiredTeamSize || !entryPrice || !thumbnail) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const tournament = await Tournaments.create({
      title,
      mode,
      map,
      winningPrice,
      eligibility,
      owner: userId,
      launchDate,
      requiredTeamSize,
      Collection: 0,
      entryPrice,
      thumbnail
    });

    userExists.tournaments.push(tournament._id);
    
    await Promise.all([
      tournament.save(),
      userExists.save(),
    ]);

    return NextResponse.json({ message: "Tournament created successfully", data: tournament }, { status: 201 });
  } catch (error) {
    console.error("Error creating tournament:", error);
    return NextResponse.json({ message: "Error creating tournament" }, { status: 500 });
  }
}
