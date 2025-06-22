import argon2 from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isEmailValid: {
        type: Boolean,
        default: false,
    }

},{timestamps: true})


//middleware for hashing password
userSchema.pre("save", async function(next){
    const userData = this;

    if(!userData.isModified("password")){
        next();
    }

    try {
        const hashPass = await argon2.hash(userData.password);
        userData.password = hashPass;
        next();
    } catch (error) {
        next(error);
    }
})

//Generate token middleware
// userSchema.methods.generateAccessToken = function(){
//     const userData = this;

//     try {
//         return jwt.sign({
//             userId: userData._id,
//             email: userData.email,
//         },
//         process.env.JWT_SECRET_KEY,
//         {
//             expiresIn: "10d",
//         },)
//     } catch (error) {
//         console.log(error);
//     }
// }

export const users = mongoose.model("user", userSchema);