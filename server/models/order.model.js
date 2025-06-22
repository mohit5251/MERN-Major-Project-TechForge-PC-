import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String
            },
            price:{
                type: String
            },
            image: {
                type: String,
            },
            quantity: {
                type: Number,
            }
        }
    ],

    shippingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        city: String,
        state: String,
        postalCode: String,
        country: { type: String, default: "India" },
    },

    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "razorpay"],
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },

    razorpayPaymentId: String,     // Optional: Razorpay ID

}, {timestamps: true});

export const order = mongoose.model("order", orderSchema);