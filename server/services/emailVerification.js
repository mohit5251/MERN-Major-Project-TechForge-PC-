import { verifyEmails } from "../models/emailVerificationModel.js";
import { users } from "../models/user.model.js";
import { sendMail } from "../nodeMailer/nodeMailer.js";
import crypto from "crypto";

export const createEmailVerificationURL = async(req, res) => {

    try {
        //1. check req.user for user loggedin or not
        if(!req.user) return res.status(400).json({message: "Please Login before Email verification"})

        //2.  findUserById to check if user exists
        const user = await users.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ message: "User not found for verification" });
        }

        if (user.isEmailValid) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        //3. create HashToken for verification
        const token = crypto.randomBytes(32).toString("hex");
        
        const hashToken = crypto.createHash("sha256").update(token).digest("hex");

        //4. first Delete existing userData then add new token Data
        await verifyEmails.deleteOne({ userId: user._id });

        await verifyEmails.create({ userId: user._id, hashToken });


        //5.  create URL
        const url = new URL(`${process.env.BASE_URL}/verify-email-success`);
        url.searchParams.append("token", token);
        url.searchParams.append("email", user.email);

        const verificationURL = url.toString();

        const html = `
            <h2>Email Verification</h2>
            <p>Hello ${user.name},</p>
            <p>Click the link below to verify your Email:</p>
            <a href="${verificationURL}" >${verificationURL}</a>
            <p>This link will expire in 1 hour.</p> `;

        //6.  send MAIL
        await sendMail({
            to: user.email,
            subject: "Verify your Email",
            html,
        })

        //send Data to front END
        return res.status(200).json({ message: "Verification email sent successfully" });

    } catch (error) {
        console.log("Email verification error: ",error);
        return res.status(500).json({ message: "Something went wrong" });
    }

}



//verifyEmailURL VERIFY THE URL & UPDATE THE DB
export const verifyEmailURL= async(req, res) => {
    try {
        //1.  getting data from query parameters
        const {token, email} = req.query;

        if (!token || !email) {
            return res.status(400).json({ message: "Missing token or email" });
        }

        //2.  check if userExists by Email
        const user = await users.findOne({ email });
        if(!user) return res.status(400).json({message: "User with this Email doesn't exists"})

        //3. create hashToken from token 
        const hashToken = crypto.createHash("sha256").update(token).digest("hex");

        //4.  check if hashToken exists in DB
        const verificationData = await verifyEmails.findOne({ hashToken });
        if(!verificationData) return res.status(400).json({message: "Invalid or Expired Token"});

        //5.  update userModel and set isEmailValid = true
        const response = await users.updateOne({ email }, {$set: { isEmailValid: true }})

        //6.  clear all token from verifyEmail table
        await verifyEmails.deleteOne({ userId: verificationData.userId });

        if(response) return res.status(200).json({message: "Email verified Successfully"})
    
    } catch (error) {
        console.log("Email verification error",error);
        return res.status(400).json({message: "Error occurs while verifying Email"})
    }
}