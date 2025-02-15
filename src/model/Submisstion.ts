import mongoose, { Schema, Document } from "mongoose";

export interface Submission extends Document {
    task: Schema.Types.ObjectId;
    student: Schema.Types.ObjectId;
    submittedContent: string;
    submissionDate: Date;
    score: number;
    status: string;
    feedback: string;
    isLate: boolean;
    gradedBy: Schema.Types.ObjectId;
}

const SubmissionSchema: Schema<Submission> = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, "Task reference is required"]
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Student reference is required"]
    },
    submittedContent: {
        type: String,
        required: [true, "Submitted content is required"],
        trim: true
    },
    submissionDate: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        min: [0, "Score cannot be negative"],
        default: null
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'graded', 'returned', 'late'],
            message: '{VALUE} is not a valid submission status'
        },
        default: 'pending'
    },
    feedback: {
        type: String,
        trim: true,
        default: ''
    },
    isLate: {
        type: Boolean,
        default: false
    },
    gradedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true
});

// Middleware to check if submission is late
SubmissionSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const task = await mongoose.model('Task').findById(this.task);
            if (task && task.deadline < this.submissionDate) {
                this.isLate = true;
                this.status = 'late';
            }
        } catch (error : any) {
            next(error);
        }
    }
    next();
});

// Virtual field for time remaining until deadline
SubmissionSchema.virtual('timeRemaining').get(function() {
    return async () => {
        const task = await mongoose.model('Task').findById(this.task);
        if (task) {
            return task.deadline.getTime() - new Date().getTime();
        }
        return null;
    };
});

export const Submission = (mongoose.models.Submission as mongoose.Model<Submission>) || 
    mongoose.model<Submission>("Submission", SubmissionSchema);