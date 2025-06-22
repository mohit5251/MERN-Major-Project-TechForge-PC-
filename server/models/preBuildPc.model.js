import mongoose from "mongoose";

const pcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    processor: {
        type: String,
        required: true,
    },
    motherBoard: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    graphicsCard: {
        type: String,
        required: true,
    },
    cpuCooler: {
        type: String,
        required: true,
    },
    ssd: {
        type: String,
        required: true,
    },
    smps:{
        type: String,
        required: true,
    },
    others:{
        type: String,
        required: true,
    },
    cabinet: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
});

export const preBuildPc = mongoose.model("preBuildpc", pcSchema);