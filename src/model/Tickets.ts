import mongoose , {Document, Schema} from "mongoose";

interface ticketType extends Document{
content : string;
poc : string,
problemType : string
}

const ticketSchema:  Schema<ticketType> = new Schema({
    content: String,
    poc: String,
    problemType: String
})

export const Ticket = mongoose.model("Ticket",ticketSchema) 