import dbConnect from '@/lib/dbConnect';
import { Task } from '@/model/Task';
import { User } from '@/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/utils/auth';

// Create Task
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(tokenData.id);
    if (!user || !['professor', 'company'].includes(user.role)) {
      return NextResponse.json({ success: false, message: 'Only professors and companies can create tasks' }, { status: 403 });
    }

    const taskData = await req.json();
    const { scorePoints, difficultyLevel, deadline, taskContent } = taskData;

    if (!scorePoints || !difficultyLevel || !deadline || !taskContent) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    const task = await Task.create({
      ...taskData,
      publisher: tokenData.id,
      joiners: [],
      submissions: []
    });

    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      data: task
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error creating task'
    }, { status: error.statusCode || 500 });
  }
}

// Get All Tasks
export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const difficulty = searchParams.get('difficulty');
    const publisher = searchParams.get('publisher');
    const upcoming = searchParams.get('upcoming') === 'true';

    let query: any = {};
    if (difficulty) query.difficultyLevel = difficulty;
    if (publisher) query.publisher = publisher;
    if (upcoming) query.deadline = { $gt: new Date() };

    const skip = (page - 1) * limit;

    const tasks = await Task.find(query)
      .populate('publisher', 'userName role')
      .skip(skip)
      .limit(limit)
      .sort({ deadline: 1 });

    const total = await Task.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total
      }
    });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching tasks'
    }, { status: error.statusCode || 500 });
  }
}

// Get Single Task
export async function GET_ONE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const task = await Task.findById(params.id)
      .populate('publisher', 'userName role')
      .populate('submissions');

    if (!task) {
      return NextResponse.json({
        success: false,
        message: 'Task not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: task
    });
  } catch (error: any) {
    console.error('Error fetching task:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error fetching task'
    }, { status: error.statusCode || 500 });
  }
}

// Update Task
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json({
        success: false,
        message: 'Task not found'
      }, { status: 404 });
    }

    if (task.publisher.toString() !== tokenData.id) {
      return NextResponse.json({
        success: false,
        message: 'Only the task publisher can update this task'
      }, { status: 403 });
    }

    const updateData = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('publisher', 'userName role');

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error: any) {
    console.error('Error updating task:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error updating task'
    }, { status: error.statusCode || 500 });
  }
}

// Delete Task
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json({
        success: false,
        message: 'Task not found'
      }, { status: 404 });
    }

    if (task.publisher.toString() !== tokenData.id) {
      return NextResponse.json({
        success: false,
        message: 'Only the task publisher can delete this task'
      }, { status: 403 });
    }

    await Task.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error deleting task'
    }, { status: error.statusCode || 500 });
  }
}

// Join Task
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const task = await Task.findById(params.id);
    if (!task) {
      return NextResponse.json({
        success: false,
        message: 'Task not found'
      }, { status: 404 });
    }

    if (task.joiners.includes(tokenData.id)) {
      return NextResponse.json({
        success: false,
        message: 'You have already joined this task'
      }, { status: 400 });
    }

    task.joiners.push(tokenData.id);
    await task.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the task',
      data: task
    });
  } catch (error: any) {
    console.error('Error joining task:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Error joining task'
    }, { status: error.statusCode || 500 });
  }
}