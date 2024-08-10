import { Contact } from "@/model/Contact";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import { jwtVerify } from "jose";

// Constants for status codes
const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;

async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
  return payload.id as string;
}

async function isAdmin(userId: string) {
  const user = await User.findById(userId).lean();
  return user?.isAdmin;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    const userId = await verifyToken(token);
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    // Fetch all contact entries
    const contact = await Contact.find();
    return NextResponse.json({ message: "Contacts fetched successfully", contact }, { status: SUCCESS });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: SERVER_ERROR });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    const userId = await verifyToken(token);
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    // Fetch all contact entries
    const contact = await Contact.find();
    return NextResponse.json({ message: "Contacts fetched successfully", contact }, { status: SUCCESS });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: SERVER_ERROR });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    const userId = await verifyToken(token);
    if (!(await isAdmin(userId))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: UNAUTHORIZED });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Bad Request: ID is required" }, { status: BAD_REQUEST });
    }

    // Delete the contact entry
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Contact deleted successfully" }, { status: SUCCESS });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ message: "Server error, please try again later" }, { status: SERVER_ERROR });
  }
}
