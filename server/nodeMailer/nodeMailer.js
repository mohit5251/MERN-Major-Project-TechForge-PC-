import nodemailer from "nodemailer";

// const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "mohitkinariwala111@gmail.com",
        pass: process.env.EMAIL_APP_PASS,
    },
})

export const sendMail = async({to, subject, html}) => {

    const info = await transporter.sendMail({
        from: `MERN Project <mohitkinariwala111@gmail.com>`,
        to,
        subject,
        html,
    })
    
    console.log("mail sent successfully");
}