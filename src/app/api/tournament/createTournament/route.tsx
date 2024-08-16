import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { Types } from "mongoose"; // Import Types from Mongoose
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";
import Razorpay from "razorpay";
import shortid from "shortid";
import LaunchTournament from '@/emails/LaunchTournament';
import nodemailer from 'nodemailer';
import { render } from "@react-email/components";



const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;


const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID as string,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET as string,
  });


export async function POST(req: NextRequest) {
  await dbConnect();


  try {
    const {
      token,
      title,
      mode,
      map,
      winningPrice,
      rank1Price,
      rank2Price,
      rank3Price,
      eligibility,
      launchDate,
      time,
      requiredTeamSize,
      entryPrice,
      thumbnail,
    } = await req.json();
    console.log("image " ,thumbnail);



    
    
    // Token validation
    if (!token) {
      return NextResponse.json(
        { success: false, message: "You are not logged in" },
        { status: 403 }
      );
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const userName = payload.userName;
    const userId  = payload.id

    // Field validation
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!mode) missingFields.push("mode");
    if (!map) missingFields.push("map");
    if (winningPrice === undefined) missingFields.push("winningPrice");
    if (rank1Price === undefined) missingFields.push("rank1Price");
    if (rank2Price === undefined) missingFields.push("rank2Price");
    if (rank3Price === undefined) missingFields.push("rank3Price");
    if (!eligibility) missingFields.push("eligibility");
    if (!launchDate) missingFields.push("launchDate");
    if (!time) missingFields.push("time");
    if (requiredTeamSize === undefined) missingFields.push("requiredTeamSize");
    if (entryPrice === undefined) missingFields.push("entryPrice");
    if (!thumbnail) missingFields.push("thumbnail");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: "Missing required fields", missingFields },
        { status: 400 }
      );
    }

    // User existence validation
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Data validation
    if (typeof title !== "string" || title.trim() === "") {
      return NextResponse.json({ message: "Invalid title" }, { status: 400 });
    }
    if (typeof mode !== "string" || mode.trim() === "") {
      return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
    }
    if (typeof map !== "string" || map.trim() === "") {
      return NextResponse.json({ message: "Invalid map" }, { status: 400 });
    }
    if (isNaN(Number(winningPrice)) || Number(winningPrice) < 0) {
      return NextResponse.json({ message: "Invalid winningPrice" }, { status: 400 });
    }
    if (isNaN(Number(rank1Price)) || Number(rank1Price) < 0) {
      return NextResponse.json({ message: "Invalid rank1Price" }, { status: 400 });
    }
    if (isNaN(Number(rank2Price)) || Number(rank2Price) < 0) {
      return NextResponse.json({ message: "Invalid rank2Price" }, { status: 400 });
    }
    if (isNaN(Number(rank3Price)) || Number(rank3Price) < 0) {
      return NextResponse.json({ message: "Invalid rank3Price" }, { status: 400 });
    }
    if (typeof eligibility !== "string" || eligibility.trim() === "") {
      return NextResponse.json({ message: "Invalid eligibility" }, { status: 400 });
    }
    if (isNaN(Date.parse(launchDate))) {
      return NextResponse.json({ message: "Invalid launchDate" }, { status: 400 });
    }
    if (typeof time !== "string" || time.trim() === "") {
      return NextResponse.json({ message: "Invalid time" }, { status: 400 });
    }
    if (isNaN(Number(requiredTeamSize)) || Number(requiredTeamSize) <= 0) {
      return NextResponse.json({ message: "Invalid requiredTeamSize" }, { status: 400 });
    }
    if (isNaN(Number(entryPrice)) || Number(entryPrice) < 0) {
      return NextResponse.json({ message: "Invalid entryPrice" }, { status: 400 });
    }
    if (typeof thumbnail !== "string" || thumbnail.trim() === "") {
      return NextResponse.json({ message: "Invalid thumbnail" }, { status: 400 });
    }


    // Create the tournament
    const newTournament = new Tournaments({
      owner : userName,
      title,
      mode,
      map,
      winningPrice: Number(winningPrice),
      rank1Price: Number(rank1Price),
      rank2Price: Number(rank2Price),
      rank3Price: Number(rank3Price),
      eligibility,
      launchDate,
      time,
      requiredTeamSize: Number(requiredTeamSize),
      entryPrice: Number(entryPrice),
      thumbnail,
    });

    await newTournament.save();

    // Update the user's tournaments array
    userExists.tournaments.push(newTournament._id as Types.ObjectId);
    await userExists.save();

    // Send confirmation email to the user
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

      
  const emailTemplate = render(
    <LaunchTournament username = {userExists.userName as string} title= {title}/>
);

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userExists.email,
    subject: 'Registration Confirmation',
    html: emailTemplate,
};

await transporter.sendMail(mailOptions);



    return NextResponse.json(
      { message: "Tournament created successfully", data: newTournament },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating tournament:", error.message);
    return NextResponse.json(
      { message: "Error creating tournament", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(req:NextRequest) {
  const {
    token,
    title,
    winningPrice,
    rank1Price,
    rank2Price,
    rank3Price,
   
  } = await req.json();

  const tournament = await Tournaments.find({title})
  // if (tournament) {
  //   return NextResponse.json({
  //     success : false,
  //     message : "Tournament with same name already exists"
  //   },{status : 401})
  // }
 if( winningPrice !== (rank1Price +  rank2Price + rank3Price)){
  return NextResponse.json({
    success : false,
    message : "Winning price should be equal to the sum of rank prices"
    },{status : 401})
 }
  // Token validation
  if (!token) {
    return NextResponse.json(
      { success: false, message: "You are not logged in" },
      { status: 403 }
    );
  }

  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  const userName = payload.userName;
  const userId  = payload.id


  const user = await User.findById({_id : userId})
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
      );
    }

    const options = {
      amount: (winningPrice * 100).toString(), // Razorpay expects amount in paise
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
  };

  const order = await razorpay.orders.create(options);

  return NextResponse.json({
    success : true,
    message: 'Payment successful',
    order,
}, { status: SUCCESS });


}