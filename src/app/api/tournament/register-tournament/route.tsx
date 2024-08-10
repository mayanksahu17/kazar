import { NextRequest, NextResponse } from 'next/server';
import shortid from 'shortid';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/dbConnect';
import { jwtVerify } from 'jose';
import { Teams } from '@/model/Teams';
import { Tournaments } from '@/model/Tournaments';
import { User } from '@/model/User';
import mongoose from 'mongoose';

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;

const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID!,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const { amount, teamName, token, tournamentName } = await req.json();

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

        // Validate input data
        if (!tournamentName || typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ message: 'All fields are required and amount must be a positive number' }, { status: BAD_REQUEST });
        }

        // Find the tournament by name
        const tournament = await Tournaments.findOne({ title: tournamentName }).lean();
        if (!tournament) {
            return NextResponse.json({ message: "Tournament not found" }, { status: BAD_REQUEST });
        }

        // Check if the user is already registered for the tournament
        if (user.registeredTournaments?.includes(tournament.title)) {
            return NextResponse.json({ message: "You are already registered for this tournament" }, { status: BAD_REQUEST });
        }

        // Handle different tournament modes
        if (tournament.mode === "solo") {
            if (teamName && teamName.length > 0) {
                // Treat teamName as userName for solo tournaments
                const soloUser = await User.findOne({ username: teamName }).lean();
                if (!soloUser) {
                    return NextResponse.json({ message: "User not found" }, { status: BAD_REQUEST });
                }
                tournament.registeredSoloTeams.push(soloUser._id as mongoose.Types.ObjectId);
            } else {
                tournament.registeredSoloTeams.push(user._id as mongoose.Types.ObjectId);
            }
        } else if (tournament.mode === "duo" || tournament.mode === "squad") {
            if (!teamName) {
                return NextResponse.json({ message: "Team name is required for duo and squad tournaments" }, { status: BAD_REQUEST });
            }

            // Find the team by teamName
            const team = await Teams.findOne({ teamName }).lean();
            if (!team) {
                return NextResponse.json({ message: "Team not found" }, { status: BAD_REQUEST });
            }

            // Push the teamId into the registeredTeams array
            tournament.registeredTeams.push(team._id as mongoose.Types.ObjectId);
            await Teams.findByIdAndUpdate({ _id : team._id}, {$push: { registeredTournament: tournament._id }} );
        }

        // Save the tournament changes
        await Tournaments.findByIdAndUpdate(tournament._id, {
            registeredTeams: tournament.registeredTeams,
            registeredSoloTeams: tournament.registeredSoloTeams,
        });

        // Initialize Razorpay order
        const options = {
            amount: (amount * 100).toString(), // Razorpay expects amount in paise
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        // Update user with the registered tournament
        await User.findByIdAndUpdate(userId, { $push: { registeredTournaments: tournament.title } });

        return NextResponse.json({
            message: 'Registration successful',
            order,
            user
        }, { status: SUCCESS });

    } catch (err: any) {
        console.error('Server error:', err);
        return NextResponse.json({ error: 'Internal Server Error', details: err.message }, { status: SERVER_ERROR });
    }
}
