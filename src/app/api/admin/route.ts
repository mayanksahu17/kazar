import { NextRequest, NextResponse } from 'next/server';
import { RegisterREQ } from '@/model/RegisterREQ';
import dbConnect from '@/lib/dbConnect';
import { Teams } from '@/model/Teams';
import { User } from '@/model/User';
import { jwtVerify } from 'jose';



export async function POST(req:NextRequest) {
    return NextResponse.json({
        success : false ,
        message : "foo",

    },{status : 500})
}