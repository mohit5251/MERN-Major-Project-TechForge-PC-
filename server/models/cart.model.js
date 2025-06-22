import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        default: 1,
    },
})

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    items: [cartItemSchema],    //array of cart items

}, {timestamps: true});

export const cart = mongoose.model("cart", cartSchema);