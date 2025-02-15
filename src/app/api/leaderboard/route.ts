import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Student } from '@/model/Student';
import { User } from '@/model/User';

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    // Extract pagination and filtering parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const year = searchParams.get('year');
    const section = searchParams.get('section');

    // Build query
    let query: any = {};
    if (year) query.year = parseInt(year, 10);
    if (section) query.section = section;

    const skip = (page - 1) * limit;

    // Aggregate pipeline for leaderboard
    const leaderboard = await Student.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $match: query },
      { $sort: { 'scores.totalScore': -1 } },
      {
        $setWindowFields: {
          sortBy: { 'scores.totalScore': -1 },
          output: { rank: { $rank: {} } }
        }
      },
      {
        $project: {
          rank: 1,
          userName: '$user.userName',
          email: '$user.email',
          enrollmentNumber: 1,
          year: 1,
          section: 1,
          totalScore: '$scores.totalScore'
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]);

    // Get total count for pagination
    const total = await Student.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: leaderboard,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEntries: total
      }
    });
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ success: false, message: error.message || 'Internal server error' }, { status: 500 });
  }
}
