import { User } from '@/model/User';
import dbConnect from '@/lib/dbConnect';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { userName, email, password, role } = await req.json();
    
    // Input validation
    const errors = [];
    if (!validator.isEmail(email)) errors.push('Invalid email');
  
    if (!validator.isLength(password, { min: 8 })) errors.push('Password must be at least 8 characters long');
    
    
    if (errors.length) {
      return new Response(JSON.stringify({ success: false, message: errors.join(', ') }), { status: 400 });
    }
    
    // Check if user already exists
    const userExist = await User.findOne({
      $or: [{ userName }, { email }, { role }],
    });

    if (userExist) {
      return new Response(JSON.stringify({ success: false, message: 'User already exists with same Email or Username' }), { status: 400 });
    }

    // Secure password hashing
    const saltRounds = 12;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    const user = new User({
      userName,
      email,
      password: hashedPassword,
      role,
      verifyCode
    });

    await user.save();

    return new Response(JSON.stringify({ success: true, message: 'User created successfully', data: user }), { status: 201 });
  } catch (error) {
    console.error('Error registering user', error);
    return new Response(JSON.stringify({ success: false, message: 'Error registering user' }), { status: 500 });
  }
}
