import mongoose, { Schema, Document } from "mongoose";

export interface Task extends Document {
    scorePoints: number;
    difficultyLevel: string;
    deadline: Date;
    publisher: Schema.Types.ObjectId;
    taskContent: string;
    submissions: Schema.Types.ObjectId[];
}

const TaskSchema: Schema<Task> = new Schema({
    scorePoints: {
        type: Number,
        required: [true, "Score points are required"],
        min: [0, "Score points cannot be negative"]
    },
    difficultyLevel: {
        type: String,
        required: [true, "Difficulty level is required"],
        enum: {
            values: ['easy', 'medium', 'hard'],
            message: '{VALUE} is not a valid difficulty level'
        }
    },
    deadline: {
        type: Date,
        required: [true, "Deadline is required"]
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Publisher is required"]
    },
    taskContent: {
        type: String,
        required: [true, "Task content is required"],
        trim: true
    },
    submissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Submission'  // Assuming you'll have a Submission model
    }]
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

export const Task = (mongoose.models.Task as mongoose.Model<Task>) || mongoose.model<Task>("Task", TaskSchema);