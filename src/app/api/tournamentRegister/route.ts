import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";


 export async function POST(req:NextRequest) {
    await dbConnect();
    
}