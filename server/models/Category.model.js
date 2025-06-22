import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
        unique: true,
    },
    categoryDesc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

export const category = mongoose.model("category", categorySchema);