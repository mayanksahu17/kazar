import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import validator from "validator";

export async function POST(req:NextRequest) {

    const {} = await req.json()
    
    
}