import dbConnect from '@/lib/dbConnect';
import { Task } from '@/model/Task';
import { User } from '@/model/User';
import { Submission } from '@/model/Submisstion';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/utils/auth';

// ✅ Create Task
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
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const task = await Task.create({
      ...taskData,
      publisher: tokenData.id,
      joiners: [],
      submissions: []
    });

    return NextResponse.json({ success: true, message: 'Task created successfully', data: task }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error creating task' }, { status: 500 });
  }
}

// ✅ Get All Tasks
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
    const tasks = await Task.find(query).populate('publisher', 'userName role').skip(skip).limit(limit).sort({ deadline: 1 });
    const total = await Task.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: tasks,
      pagination: { currentPage: page, totalPages: Math.ceil(total / limit), totalTasks: total }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error fetching tasks' }, { status: 500 });
  }
}

// ✅ Get Single Task
export async function GET_ONE(req: NextRequest) {
  
  await dbConnect();
  try {
    const { id } = await req.json(); // Extract task ID from the request body

    const task = await Task.findById(id).populate('publisher', 'userName role').populate('submissions');
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error fetching task' }, { status: 500 });
  }
}

// ✅ Update Task
export async function PUT(req: NextRequest) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...updateData } = await req.json();

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    if (task.publisher.toString() !== tokenData.id) {
      return NextResponse.json({ success: false, message: 'Only the task publisher can update this task' }, { status: 403 });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('publisher', 'userName role');

    return NextResponse.json({ success: true, message: 'Task updated successfully', data: updatedTask });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error updating task' }, { status: 500 });
  }
}

// ✅ Delete Task
export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();
    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    if (task.publisher.toString() !== tokenData.id) {
      return NextResponse.json({ success: false, message: 'Only the task publisher can delete this task' }, { status: 403 });
    }

    await Task.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Task deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error deleting task' }, { status: 500 });
  }
}

// ✅ Join Task
export async function PATCH(req: NextRequest) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json();

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    if (task.joiners.includes(tokenData.id)) {
      return NextResponse.json({ success: false, message: 'You have already joined this task' }, { status: 400 });
    }

    task.joiners.push(tokenData.id);
    await task.save();

    return NextResponse.json({ success: true, message: 'Successfully joined the task', data: task });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error joining task' }, { status: 500 });
  }
}

// ✅ Submit Task (Automatically Adds User to Joiners)
export async function SUBMIT(req: NextRequest) {
  await dbConnect();
  try {
    const tokenData = await getUserFromToken(req);
    if (!tokenData) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { taskId, submittedContent } = await req.json();
    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
    }

    const existingSubmission = await Submission.findOne({ task: taskId, student: tokenData.id });
    if (existingSubmission) {
      return NextResponse.json({ success: false, message: 'You have already submitted this task' }, { status: 400 });
    }

    const submission = await Submission.create({
      task: taskId,
      student: tokenData.id,
      submittedContent,
      submissionDate: new Date(),
      status: 'pending'
    });

    await Task.updateOne({ _id: taskId }, { $addToSet: { joiners: tokenData.id } });

    return NextResponse.json({ success: true, message: 'Task submitted successfully', data: submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error submitting task' }, { status: 500 });
  }
}
