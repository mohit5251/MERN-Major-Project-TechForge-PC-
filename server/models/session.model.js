import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // must match the model name in `mongoose.model("user", ...)`
    required: true,
  },
  sessionId: {
    type:Number,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

export const sessions = mongoose.model("session", sessionSchema);
