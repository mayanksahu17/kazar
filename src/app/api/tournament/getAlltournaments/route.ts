import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { User } from "@/model/User";


const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;

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


export async function POST(req:NextRequest) {
    try {
        await dbConnect();
        const { token } = await req.json();
    
        if (!token || token === "") {
          return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
        }
    
        // Verify JWT token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
        const userId = payload.id as string;
    
        // Find the user by ID
        const user = await User.findById(userId).lean();
        if (!user) {
          return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
        }
            
        const tournaments = Tournaments.find({_id : {$in : user.registeredTournaments}})
        if (!tournaments) {
            NextResponse.json({
                message : "Internal server error",
                }, {status: 500
            })  
        }
        return NextResponse.json({
            success : true,
            message : "Tournament found successfully",
            data : tournaments
        }, {status: 200})
    
    } catch (error) {
        NextResponse.json({
            message : "Internal server error",
            error : error
            }, {status: 500
        })  
    }
}