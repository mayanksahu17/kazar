import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";
import validator from "validator";
import { jwtVerify } from "jose";
import { UpdateIcon } from "@radix-ui/react-icons";

export async function POST(req:NextRequest) {
try {
    await dbConnect()
    
        const {
            token,
            userName,
            email,
            mobileNumber,
            bgmiId,
            upi,
            bgmiUsername
        } = await req.json()

        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    
        const user = await User.findByIdAndUpdate({_id : payload.id},{
            userName,
            email,
            mobileNumber,
            bgmiId,
            upi,
            bgmiUsername
        })
    
        return NextResponse.json({
            success : true ,
            message : "User updated successfully",
            data : user
    
        },{
            status : 200
        })
    
} catch (error: any) {
    return NextResponse.json({
        success : false ,
        message : "Error updating user",
        data : error.message
    },{
        status : 500
    })
}


    
}