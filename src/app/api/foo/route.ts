import { NextRequest, NextResponse } from "next/server";
import tournaments from "./tournaments.json" // Import the JSON data

export async function GET(req:NextRequest) {

        return NextResponse.json({
            message : 'le re lund ke',
            tournaments : tournaments
//
        })
    
    return NextResponse.json({
        success : true
    })
}
