import mongoose, { Document , Schema} from "mongoose";


export interface IContact extends Document{
    name : String;
    email : String;
    message : String;
    user : String;
    status : String;
    createdAt : Date
}
const ContactMessageSchema :Schema<IContact> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user : {
    type : String
  },
  status : {
    type : String
  }
});

export const Contact = ( mongoose.models.Contact as mongoose.Model<IContact>) || mongoose.model<IContact>("Contact", ContactMessageSchema)
