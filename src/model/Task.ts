import mongoose, { Schema, Document } from "mongoose";

export interface Submission {
    studentId: string;
    status: "pending" | "complete" | "rejected";
    submittedAt: Date;
}

export interface Task extends Document {
    scorePoints: number;
    difficultyLevel: string;
    deadline: Date;
    publisher: Schema.Types.ObjectId;
    taskContent: string;
    joiners: string[];
    submissions: Submission[];
}

const TaskSchema: Schema<Task> = new Schema(
    {
        scorePoints: {
            type: Number,
            required: true,
            min: 0,
        },
        difficultyLevel: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard"],
        },
        deadline: {
            type: Date,
            required: true,
        },
        publisher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        taskContent: {
            type: String,
            required: true,
            trim: true,
        },
        joiners: [
            {
                type: String, // Storing student ID
            },
        ],
        submissions: [
            {
                studentId: { type: String, required: true },
                status: {
                    type: String,
                    enum: ["pending", "complete", "rejected"],
                    default: "pending",
                },
                submittedAt: { type: Date, default: Date.now },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Task =
    (mongoose.models.Task as mongoose.Model<Task>) ||
    mongoose.model<Task>("Task", TaskSchema);
