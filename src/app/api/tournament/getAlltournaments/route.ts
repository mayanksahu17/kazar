import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";

export async function GET(req:NextRequest) {

    await dbConnect()
    try {
        const Tournament =  await Tournaments.find()
       
            return NextResponse.json({
                success : true,
                message : "Tournament found successfully",
                data : Tournament
            }, {status: 200})
        
    } catch (error) {
        NextResponse.json({
            message : "Internal server error",
            error : error
            }, {status: 500
        })       
    }
    
}