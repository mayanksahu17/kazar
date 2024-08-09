import { User } from "@/model/User";
import { jwtVerify } from "jose";
import {NextRequest, NextResponse} from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";

const UNAUTHORIZED = 401;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;


const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID as string,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET as string,
  });


export async function POST(req : NextRequest) {
    const { token , Tname ,  } = await  req.json()

 
    
    let payload;
    try {
     
      const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
      payload = verified.payload;
  } catch (err) {
      return NextResponse.json({ message: "Unauthorized - Invalid Token" }, { status: UNAUTHORIZED });
  }

  const userId = payload.id as string;

  // Find the user by ID
  const user = await User.findById(userId).lean();
  if (!user) {
      return NextResponse.json({ message: "Unauthorized - User not found" }, { status: UNAUTHORIZED });
  }



  
    const payment_capture = 1;
    const amount = 100 * 100 // amount in paisa. In our case it's INR 1
    const currency = "INR";
    const options = {
        amount: (amount).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
        notes: {
            paymentFor: user.userName,
            userId: user._id as string,
            productId: JSON.stringify(Tname)
        }
    };

   const order = await instance.orders.create(options);
  return NextResponse.json({ msg: "success",order });
}
