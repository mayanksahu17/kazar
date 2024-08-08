import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/model/User';
import dbConnect from '@/lib/dbConnect';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const query = req.nextUrl.searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Fetch usernames matching the query
    const users = await User.find({ userName: { $regex: query, $options: 'i' } }).select('userName -_id');

    // Extract usernames from the users array
    const usernames = users.map(user => user.userName);

    return NextResponse.json({
      success: true,
      data: usernames,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}
