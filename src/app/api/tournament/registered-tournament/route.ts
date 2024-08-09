import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { jwtVerify } from "jose";
import { User } from "@/model/User";

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    // Validate the presence of the token
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    // Verify JWT token
    let payload;
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        payload = verified.payload;
    } catch (err) {
        return NextResponse.json({ message: "Unauthorized - Invalid Token" }, { status: UNAUTHORIZED });
    }

    const userId = payload.id as string;

    // Find the user by ID
    const user = await User.findById(userId).lean();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized - User not found" }, { status: UNAUTHORIZED });
    }

    const arrayOfTournamentsTital = user.registeredTournaments;

    await dbConnect();

    try {
        // Optimized query to find tournaments by titles
        const tournaments = await Tournaments.find({
            title: { $in: arrayOfTournamentsTital }
        }).lean();

        return NextResponse.json({
            success: true,
            message: "Tournaments found successfully",
            data: tournaments
        }, { status: SUCCESS });

    } catch (error : any) {
        return NextResponse.json({
            message: "Internal server error",
            error: error.message
        }, { status: SERVER_ERROR });
    }
}
