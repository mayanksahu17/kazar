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
      roomId,
      password,
      entryPrice,
      mode,
      map,
      winningPrice,
      eligiblity,
      owner,
      participants,
      launchDate,
      thumbNail,
      maxTeams
    } = await req.json();

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "You are not logged in",
      }, { status: 403 });
    }

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const userId = payload.id;

    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!roomId) missingFields.push('roomId');
    if (!password) missingFields.push('password');
    if (entryPrice === undefined) missingFields.push('entryPrice');
    if (!mode) missingFields.push('mode');
    if (!map) missingFields.push('map');
    if (winningPrice === undefined) missingFields.push('winningPrice');
    if (!eligiblity) missingFields.push('eligiblity');
    if (!owner) missingFields.push('owner');
    if (!participants) missingFields.push('participants');
    if (!launchDate) missingFields.push('launchDate');
    if (!thumbNail) missingFields.push('thumbNail');
    if (maxTeams === undefined) missingFields.push('maxTeams');

    if (missingFields.length > 0) {
      return NextResponse.json({ message: 'Missing required fields', missingFields }, { status: 400 });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ message: 'Invalid title' }, { status: 400 });
    }
    if (typeof roomId !== 'string' || roomId.trim() === '') {
      return NextResponse.json({ message: 'Invalid roomId' }, { status: 400 });
    }
    if (typeof password !== 'string' || password.trim() === '') {
      return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
    }
    if (typeof entryPrice !== 'number' || entryPrice < 0) {
      return NextResponse.json({ message: 'Invalid entryPrice' }, { status: 400 });
    }
    if (typeof mode !== 'string' || mode.trim() === '') {
      return NextResponse.json({ message: 'Invalid mode' }, { status: 400 });
    }
    if (typeof map !== 'string' || map.trim() === '') {
      return NextResponse.json({ message: 'Invalid map' }, { status: 400 });
    }
    if (typeof winningPrice !== 'number' || winningPrice < 0) {
      return NextResponse.json({ message: 'Invalid winningPrice' }, { status: 400 });
    }
    if (typeof eligiblity !== 'string' || eligiblity.trim() === '') {
      return NextResponse.json({ message: 'Invalid eligiblity' }, { status: 400 });
    }
    if (typeof owner !== 'string' || owner.trim() === '') {
      return NextResponse.json({ message: 'Invalid owner' }, { status: 400 });
    }
    if ( participants.length === 0) {
      return NextResponse.json({ message: 'Invalid participants' }, { status: 400 });
    }
    if (isNaN(Date.parse(launchDate))) {
      return NextResponse.json({ message: 'Invalid launchDate' }, { status: 400 });
    }
    if (typeof thumbNail !== 'string' || thumbNail.trim() === '') {
      return NextResponse.json({ message: 'Invalid thumbNail' }, { status: 400 });
    }
    if (typeof maxTeams !== 'number' || maxTeams <= 0) {
      return NextResponse.json({ message: 'Invalid maxTeams' }, { status: 400 });
    }

    const newTournament = new Tournaments({
      title,
      roomId,
      password,
      entryPrice,
      mode,
      map,
      winningPrice,
      eligiblity,
      owner,
      participants,
      launchDate,
      thumbNail,
      maxTeams,
    });

    await newTournament.save();

    userExists.tournaments.push(newTournament._id);
  
    await userExists.save();

    return NextResponse.json({ message: "Tournament created successfully", data: newTournament }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tournament:", error.message);
    return NextResponse.json({ message: "Error creating tournament", error: error.message }, { status: 500 });
  }
}
