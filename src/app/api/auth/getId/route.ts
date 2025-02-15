import { User } from '@/model/User';
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import { getUserFromToken } from '@/utils/auth';
export async function POST(req: Request) {
  try {
    await dbConnect();

    const { token } = await req.json();
    const user = getUserFromToken(token)
    console.log(user);
    
    return new Response(JSON.stringify({ success: true, message: 'User fetched successfully', data: user }), { status: 201 });
  } catch (error) {
    console.error('Error getting user id ', error);
    return new Response(JSON.stringify({ success: false, message: 'Error registering user' }), { status: 500 });
  }
}
