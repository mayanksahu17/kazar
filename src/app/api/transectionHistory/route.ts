import { Transectionhistory } from "@/model/TrasectionHistory";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { jwtVerify } from "jose";
import next from "next";

export async function POST(req:NextRequest) {
    const token  = req.cookies.get("token")?.value 
    
 try {
       
       if (!token) {
           return new Response("Unauthorized", { status: 401 });
       }
       const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
       const userId = payload.id
       const transectionHistory = await Transectionhistory.find({userId})
       if (!transectionHistory || transectionHistory.length === 0) {
           return  NextResponse.json({
               sucess : false,
               message : "No transection history found",
               data : []
           },{
               status : 202
           })
       }
       else{
           return NextResponse.json({
               sucess : true,
               message : "transection history found",
               data : transectionHistory
       },{
           status : 200
       })
   }   
 } catch (error) {
    return NextResponse.json({
        sucess : false,
        message : " Internal server error",
        data : null,
        error : error
},{
    status : 500
})
 }
}