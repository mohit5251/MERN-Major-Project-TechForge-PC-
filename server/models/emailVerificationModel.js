import mongoose from "mongoose";

const verifyEmailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    hashToken: {
        type: String,
        required: true,
        unique: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

verifyEmailSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const verifyEmails = mongoose.model("verifyEmail", verifyEmailSchema);