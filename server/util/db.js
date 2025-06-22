import mongoose from "mongoose"

export const connection_db = async() => {
    const URI = process.env.MONGOOSE_URI;
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}