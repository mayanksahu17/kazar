import { NextRequest, NextResponse } from "next/server";
import { Tournaments } from "@/model/Tournaments";
import { User } from "@/model/User";
import { Twallet , TWallet } from "@/model/Wallet"; 
import { getUser } from "@/helpers/getUser";
import { ObjectId } from 'mongodb';
import { jwtVerify } from "jose";
import dbConnect from "@/lib/dbConnect";



export async function GET(req:NextRequest) {
    // const Wallet = await TWallet.find()
    const Tournament = await Tournaments.find()

    // console.log(Wallet);
    
    return NextResponse.json(Tournament)
    
}