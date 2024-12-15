import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { Types } from "mongoose";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";
import Razorpay from "razorpay";
import shortid from "shortid";
import nodemailer from 'nodemailer';
import { render } from "@react-email/components";
import LaunchTournament from '@/emails/LaunchTournament';

// Enum for HTTP Status Codes
enum HttpStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

// Interface for Tournament Input
interface TournamentInput {
  token: string;
  title: string;
  mode: string;
  map: string;
  winningPrice: number;
  rank1Price: number;
  rank2Price: number;
  rank3Price: number;
  eligibility: string;
  launchDate: string;
  time: string;
  requiredTeamSize: number;
  entryPrice: number;
  thumbnail: string;
}

// Validation Utility
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Tournament Service
class TournamentService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID as string,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET as string,
    });
  }

  // Validate input fields
  private validateInput(input: TournamentInput) {
    const requiredFields: (keyof TournamentInput)[] = [
      'title', 'mode', 'map', 'winningPrice', 'rank1Price', 
      'rank2Price', 'rank3Price', 'eligibility', 'launchDate', 
      'time', 'requiredTeamSize', 'entryPrice', 'thumbnail'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => 
      !input[field] || (typeof input[field] === 'string' && input[field].trim() === '')
    );

    if (missingFields.length > 0) {
      throw new ValidationError(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Detailed validations
    this.validateString(input.title, 'Title');
    this.validateString(input.mode, 'Mode');
    this.validateString(input.map, 'Map');
    this.validatePositiveNumber(input.winningPrice, 'Winning Price');
    this.validatePositiveNumber(input.rank1Price, 'Rank 1 Price');
    this.validatePositiveNumber(input.rank2Price, 'Rank 2 Price');
    this.validatePositiveNumber(input.rank3Price, 'Rank 3 Price');
    this.validateString(input.eligibility, 'Eligibility');
    this.validateDate(input.launchDate, 'Launch Date');
    this.validateString(input.time, 'Time');
    this.validatePositiveInteger(input.requiredTeamSize, 'Required Team Size');
    this.validatePositiveNumber(input.entryPrice, 'Entry Price');
    this.validateString(input.thumbnail, 'Thumbnail');

    // Validate prize distribution
    if (input.winningPrice !== (input.rank1Price + input.rank2Price + input.rank3Price)) {
      throw new ValidationError('Winning price must equal the sum of rank prizes');
    }
  }

  // String validation
  private validateString(value: string, fieldName: string) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new ValidationError(`Invalid ${fieldName}`);
    }
  }

  // Positive number validation
  private validatePositiveNumber(value: number, fieldName: string) {
    if (isNaN(Number(value)) || Number(value) < 0) {
      throw new ValidationError(`Invalid ${fieldName}`);
    }
  }

  // Positive integer validation
  private validatePositiveInteger(value: number, fieldName: string) {
    if (isNaN(Number(value)) || Number(value) <= 0) {
      throw new ValidationError(`Invalid ${fieldName}`);
    }
  }

  // Date validation
  private validateDate(value: string, fieldName: string) {
    if (isNaN(Date.parse(value))) {
      throw new ValidationError(`Invalid ${fieldName}`);
    }
  }

  // Verify JWT token
  private async verifyToken(token: string) {
    if (!token) {
      throw new ValidationError('No authentication token provided');
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      return {
        userId: payload.id as string,
        userName: payload.userName as string
      };
    } catch (error) {
      throw new ValidationError('Invalid authentication token');
    }
  }

  // Create tournament
  async createTournament(input: TournamentInput) {
    await dbConnect();

    // Validate input
    this.validateInput(input);

    // Verify token
    const { userId, userName } = await this.verifyToken(input.token);

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError('User not found');
    }

    // Create tournament
    const newTournament = new Tournaments({
      owner: userName,
      title: input.title,
      mode: input.mode,
      map: input.map,
      winningPrice: Number(input.winningPrice),
      rank1Price: Number(input.rank1Price),
      rank2Price: Number(input.rank2Price),
      rank3Price: Number(input.rank3Price),
      eligibility: input.eligibility,
      launchDate: input.launchDate,
      time: input.time,
      requiredTeamSize: Number(input.requiredTeamSize),
      entryPrice: Number(input.entryPrice),
      thumbnail: input.thumbnail,
    });

    await newTournament.save();

    // Update user's tournaments
    user.tournaments.push(newTournament._id as Types.ObjectId);
    await user.save();

    // Send confirmation email
    await this.sendConfirmationEmail(user, input.title);

    return newTournament;
  }

  // Send confirmation email
  private async sendConfirmationEmail(user: any, tournamentTitle: string) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailTemplate = render(
        <LaunchTournament username={user.userName} title={tournamentTitle} />
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Tournament Launch Confirmation',
        html: emailTemplate,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      // Non-critical error, tournament creation still succeeds
    }
  }

  // Create Razorpay order
  async createPaymentOrder(input: { 
    token: string, 
    winningPrice: number 
  }) {
    // Verify token first
    await this.verifyToken(input.token);

    const options = {
      amount: Math.round(input.winningPrice * 100), // Convert to paise
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
    };

    try {
      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      throw new ValidationError('Payment order creation failed');
    }
  }
}

// API Handlers
const tournamentService = new TournamentService();

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const tournament = await tournamentService.createTournament(input);

    return NextResponse.json(
      { 
        message: "Tournament created successfully", 
        data: tournament 
      },
      { status: HttpStatus.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const input = await req.json();
    const order = await tournamentService.createPaymentOrder(input);

    return NextResponse.json({
      success: true,
      message: 'Payment order created successfully',
      order,
    }, { status: HttpStatus.SUCCESS });
  } catch (error) {
    return handleError(error);
  }
}

// Central error handling
function handleError(error: any) {
  console.error('Tournament API Error:', error);

  if (error instanceof ValidationError) {
    return NextResponse.json(
      { 
        success: false, 
        message: error.message 
      }, 
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  return NextResponse.json(
    { 
      success: false, 
      message: 'An unexpected error occurred' 
    }, 
    { status: HttpStatus.SERVER_ERROR }
  );
}