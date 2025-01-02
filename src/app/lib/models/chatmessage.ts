import { MessageChat } from "@/app/types/user";
import  mongoose, { Schema, model, models } from "mongoose";

const ChatMessageSchema = new Schema<MessageChat>({
    username: { type: String, required: true },
    text: { type: String, required: true },
    otheruser:{type:String},
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.models.ChatMessage || model<MessageChat>("ChatMessage", ChatMessageSchema);

export default ChatMessage;
