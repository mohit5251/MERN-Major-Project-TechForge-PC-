import { forgotPasswords } from "../models/forgotPassword.model.js";
import { users } from "../models/user.model.js";
import crypto from "crypto";
import argon2 from "argon2";
import { sendMail } from "../nodeMailer/nodeMailer.js";

export const forgotpassword = async(req, res) => {
    try {
        const {email} = req.body;

        //1. find user by email
        const user = await users.findOne({ email });

        if(!user){
            return res.status(400).json({message: "Email is not registered"});
        }

        //2.  create hashToken
        const token = crypto.randomBytes(32).toString("hex");

        const hashToken = crypto.createHash("sha256").update(token).digest("hex");

        await forgotPasswords.deleteOne({ userId: user._id });

        await forgotPasswords.create({ userId: user._id, hashToken });

        //3.  create Url
        const url = `${process.env.BASE_URL}/forgot-password/${token}`;

        console.log("reset pass url created : ", url);

        //4. create email
        const html = `
            <h2>Password Reset</h2>
            <p>Hello ${user.name},</p>
            <p>Click the link below to reset your password:</p>
            <a href="${url}" >${url}</a>
            <p>This link will expire in 1 hour.</p> `;

        await sendMail({
            to: user.email,
            subject: "Reset your password",
            html
        })

        res.status(200).json({message: "Mail sent succesfully, check your Gmail"})

    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}



export const forgotPasswordTokenVerify = async(req, res) => {

    try {
        const {token} = req.params;

        //1. Hash the token to match the one stored in DB
        const hashToken = crypto.createHash("sha256").update(token).digest("hex");

        //2. Find the data using Hashtoken
        const verifiedData = await forgotPasswords.findOne({ hashToken });

        //3. throw error if token doesn't exists in DB
        if(!verifiedData){
            return res.status(400).json({message : "Invalid or expired Token"})
        }

        //4.  getting new and confirm password from body , 
        const {newPassword, confirmPassword} = req.body;

        const user = await users.findOne({ _id: verifiedData.userId });

        if(!user){
            return res.status(400).json({message: "user doesn't exists to reset password"})
        }

        await forgotPasswords.deleteOne({ _id: verifiedData._id });

        const hashPassword = await argon2.hash(confirmPassword);

        const response = await users.updateOne({ _id: user._id } , { $set: { password: hashPassword } });

        if(response){
            return res.status(200).json({message: "Password Updated successfully"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error occurs while updating Password"});
    }
    
}