import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Teams } from "@/model/Teams";
import {TDM} from "@/model/Tdm"


export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { thumbnail, entryPrice, winningPrice, Weapon, launchDate, name ,launchTime } = await req.json();

        const newTDM = new TDM({
            name,
            thumbnail: thumbnail,
            entryPrice,
            winningPrice,
            Weapon,
            launchDate,
            launchTime
        });

        await newTDM.save();

        return NextResponse.json({ message: "TDM created successfully", tdm: newTDM }, { status: 201 });
    } catch (error : any) {
        console.error("Error creating TDM:", error);
        return NextResponse.json({ message: "Failed to create TDM", error: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const { teamname, tdmid } = await req.json();

        const tdm = await TDM.findById(tdmid);
        if (!tdm) {
            return NextResponse.json({ message: "TDM not found" }, { status: 404 });
        }

        const team = await Teams.findOne({ teamName: teamname });
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        // Assuming you want to register the team in the first available slot (registeredTeam1 or registeredTeam2)
        if (!tdm.registeredTeam1) {
            tdm.registeredTeam1 = team._id as any;
        } else if (!tdm.registeredTeam2) {
            tdm.registeredTeam2 = team._id as any;
        } else {
            return NextResponse.json({ message: "TDM is already full" }, { status: 400 });
        }

        await tdm.save();

        return NextResponse.json({ message: "Team successfully registered", tdm }, { status: 200 });
    } catch (error : any) {
        console.error("Error joining TDM:", error);
        return NextResponse.json({ message: "Failed to join TDM", error: error.message }, { status: 500 });
    }
}

//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     thumbnail: {
//         type: String,
//         required: true
//     },
//     winningPrice: {
//         type: Number,
//         required: true
//     },
//     entryPrice: {
//         type: Number,
//         required: true
//     },
//     registeredTeam1: {
//         type: Schema.Types.ObjectId,
//         ref: "Teams"
//     },
//     registeredTeam2: {
//         type: Schema.Types.ObjectId,
//         ref: "Teams"
//     },
//     launchDate: {
//         type: Date,
//         required: true
//     },
//     Weapon: {
//         type: String,
//         default: "any"
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },

// });