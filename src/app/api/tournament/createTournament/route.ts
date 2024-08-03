import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { Types } from "mongoose"; // Import Types from Mongoose
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
      rank1Price,
      rank2Price,
      rank3Price,
      eligibility,
      launchDate,
      time,
      requiredTeamSize,
      entryPrice,
      thumbnail,
    } = await req.json();
    
    // Token validation
    if (!token) {
      return NextResponse.json(
        { success: false, message: "You are not logged in" },
        { status: 403 }
      );
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const userName = payload.userName;
    const userId  = payload.id

    // Field validation
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!mode) missingFields.push("mode");
    if (!map) missingFields.push("map");
    if (winningPrice === undefined) missingFields.push("winningPrice");
    if (rank1Price === undefined) missingFields.push("rank1Price");
    if (rank2Price === undefined) missingFields.push("rank2Price");
    if (rank3Price === undefined) missingFields.push("rank3Price");
    if (!eligibility) missingFields.push("eligibility");
    if (!launchDate) missingFields.push("launchDate");
    if (!time) missingFields.push("time");
    if (requiredTeamSize === undefined) missingFields.push("requiredTeamSize");
    if (entryPrice === undefined) missingFields.push("entryPrice");
    if (!thumbnail) missingFields.push("thumbnail");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: "Missing required fields", missingFields },
        { status: 400 }
      );
    }

    // User existence validation
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Data validation
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json({ message: "Invalid title" }, { status: 400 });
    }
    if (typeof mode !== "string" || mode.trim() === "") {
      return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
    }
    if (typeof map !== "string" || map.trim() === "") {
      return NextResponse.json({ message: "Invalid map" }, { status: 400 });
    }
    if (isNaN(Number(winningPrice)) || Number(winningPrice) < 0) {
      return NextResponse.json({ message: "Invalid winningPrice" }, { status: 400 });
    }
    if (isNaN(Number(rank1Price)) || Number(rank1Price) < 0) {
      return NextResponse.json({ message: "Invalid rank1Price" }, { status: 400 });
    }
    if (isNaN(Number(rank2Price)) || Number(rank2Price) < 0) {
      return NextResponse.json({ message: "Invalid rank2Price" }, { status: 400 });
    }
    if (isNaN(Number(rank3Price)) || Number(rank3Price) < 0) {
      return NextResponse.json({ message: "Invalid rank3Price" }, { status: 400 });
    }
    if (typeof eligibility !== "string" || eligibility.trim() === "") {
      return NextResponse.json({ message: "Invalid eligibility" }, { status: 400 });
    }
    if (isNaN(Date.parse(launchDate))) {
      return NextResponse.json({ message: "Invalid launchDate" }, { status: 400 });
    }
    if (typeof time !== "string" || time.trim() === "") {
      return NextResponse.json({ message: "Invalid time" }, { status: 400 });
    }
    if (isNaN(Number(requiredTeamSize)) || Number(requiredTeamSize) <= 0) {
      return NextResponse.json({ message: "Invalid requiredTeamSize" }, { status: 400 });
    }
    if (isNaN(Number(entryPrice)) || Number(entryPrice) < 0) {
      return NextResponse.json({ message: "Invalid entryPrice" }, { status: 400 });
    }
    if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
      return NextResponse.json({ message: "Invalid thumbnail" }, { status: 400 });
    }

    // Create the tournament
    const newTournament = new Tournaments({
      owner : userName,
      title,
      mode,
      map,
      winningPrice: Number(winningPrice),
      rank1Price: Number(rank1Price),
      rank2Price: Number(rank2Price),
      rank3Price: Number(rank3Price),
      eligibility,
      launchDate,
      time,
      requiredTeamSize: Number(requiredTeamSize),
      entryPrice: Number(entryPrice),
      thumbnail,
    });

    await newTournament.save();

    // Update the user's tournaments array
    userExists.tournaments.push(newTournament._id as Types.ObjectId);
    await userExists.save();

    return NextResponse.json(
      { message: "Tournament created successfully", data: newTournament },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating tournament:", error.message);
    return NextResponse.json(
      { message: "Error creating tournament", error: error.message },
      { status: 500 }
    );
  }
}
