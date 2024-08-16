import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Teams } from "@/model/Teams";
import {TDM} from "@/model/Tdm"
import Razorpay from "razorpay";
import shortid from "shortid";
import { jwtVerify } from "jose";
import { User } from "@/model/User";

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;


const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID as string,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET as string,
  });

  export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { teamname, tdmId, token } = await req.json();

        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        const payload = verified.payload;

        const userId = payload.id as string;

        // Find the user by ID
        const user = await User.findById(userId).lean();
        if (!user) {
            return NextResponse.json({ message: "Unauthorized - User not found" }, { status: UNAUTHORIZED });
        }
        
        const tdm = await TDM.findById(tdmId).lean();
        if (!tdm) {
            return NextResponse.json({ message: "TDM not found" }, { status: 404 });
        }

        const team = await Teams.findOne({ teamName: teamname }).lean();
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        // Convert to string for comparison since both are ObjectId
        const teamIdString = team._id.toString();
        
        if (tdm.registeredTeam1?.toString() === teamIdString || tdm.registeredTeam2?.toString() === teamIdString) {
            return NextResponse.json({ message: "Team already registered" }, { status: 400 });
        }

        const options = {
            amount: 100 * (tdm.entryPrice as number),
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture: 1,
            notes: {
                paymentFor: user.userName,
                userId: user._id as string,
                productId: JSON.stringify(tdm.name)
            }
        };
        const order = await razorpay.orders.create(options);
        return NextResponse.json({ order, user }, { status: 200 });

    } catch (error: any) {
        console.error("Error joining TDM:", error);
        return NextResponse.json({ message: "Failed to join TDM", error: error.message }, { status: 500 });
    }
}







export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
        const { teamname, tdmId , token } = await req.json();

        
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
        const payload = verified.payload;
    
  
        const userId = payload.id as string;
  
      // Find the user by ID
      const user = await User.findById(userId).lean();
      if (!user) {
          return NextResponse.json({ message: "Unauthorized - User not found" }, { status: UNAUTHORIZED });
      }

        const tdm = await TDM.findById({_id : tdmId});
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

        return NextResponse.json({ message: "Team successfully registered", tdm , user }, { status: 200 });
    } catch (error : any) {
        console.error("Error joining TDM:", error);
        return NextResponse.json({ message: "Failed to join TDM", error: error.message }, { status: 500 });
    }
}
