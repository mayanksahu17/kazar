import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { TDM } from "@/model/Tdm";

export async function GET(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Fetch all TDMs
        const tdms = await TDM.find();

        // Return the TDMs as JSON
        return NextResponse.json({ success: true, data: tdms }, { status: 200 });

    } catch (error) {
        console.error('Error fetching TDMs:', error);
        // Return an error response if something goes wrong
        return NextResponse.json({ success: false, message: 'Failed to fetch TDMs' }, { status: 500 });
    }
}
