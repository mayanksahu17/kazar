import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Tournaments } from '@/model/Tournaments';

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;

export async function POST(req: NextRequest) {
  try {
    // Parse the request payload
    const { imageUrl, tournamentId } = await req.json();

    // Validate payload
    if (!imageUrl || !tournamentId) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: BAD_REQUEST });
    }

    // Connect to the database
    await dbConnect();

    // Update the tournament with the new thumbnail and winning team
    const tournament = await Tournaments.findByIdAndUpdate(
      { _id: tournamentId },
      {
        $set: {
          thumbnail: imageUrl,
          winningTeam: imageUrl,  // Assuming the winning team image is being uploaded
        },
      },
      { new: true }
    );

    // Check if the tournament was found and updated
    if (!tournament) {
      return NextResponse.json({ message: 'Tournament not found' }, { status: BAD_REQUEST });
    }

    // Return success response with the updated tournament
    return NextResponse.json({ message: 'Tournament updated successfully', tournament }, { status: SUCCESS });

  } catch (error) {
    console.error('Error updating tournament:', error);
    return NextResponse.json({ message: 'Server error' }, { status: SERVER_ERROR });
  }
}
