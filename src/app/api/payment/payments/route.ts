import type { NextApiRequest, NextApiResponse } from 'next';
import shortid from 'shortid';
import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';




export async function POST(req:NextRequest) {
const {amount} = await req.json()    


}