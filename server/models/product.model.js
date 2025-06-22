import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    specifications: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const product = mongoose.model("product", productSchema);