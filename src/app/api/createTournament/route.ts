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
      }, { status: 403 }); // Use 403 Forbidden instead of 203
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

    // Convert types if needed
    const parsedEntryPrice = parseFloat(entryPrice);
    const parsedWinningPrice = parseFloat(winningPrice);
    const parsedRequiredTeamSize = parseInt(requiredTeamSize, 10);
    const parsedEligibility = parseInt(eligibility, 10);
    const parsedLaunchDate = new Date(launchDate);
    
    if (isNaN(parsedLaunchDate.getTime())) {
      return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }

    const tournament = await Tournaments.create({
      title,
      mode,
      map,
      winningPrice: parsedWinningPrice,
      eligibility: parsedEligibility,
      owner: userId,
      launchDate: parsedLaunchDate,
      requiredTeamSize: parsedRequiredTeamSize,
      Collection: 0,
      entryPrice: parsedEntryPrice,
      thumbnail
    });

    userExists.tournaments.push(tournament._id);
    
    await Promise.all([
      tournament.save(),
      userExists.save(),
    ]);

    return NextResponse.json({ message: "Tournament created successfully", data: tournament }, { status: 201 });
  } catch (error : any) {
    console.error("Error creating tournament:", error.message);
    return NextResponse.json({ message: "Error creating tournament", error: error.message }, { status: 500 });
  }
}
