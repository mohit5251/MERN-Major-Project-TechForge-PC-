import z from "zod";

export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"})
    .trim()
    .email({message: "Please enter valid email"})
    .max(100,{message: "email must be smaller than 100 characters"}),

    password: z.string({required_error: "Password is required"})
    .trim()
    .min(7,{message: "Password must be atleast of 7 characters"})
    .max(30,{message: "Password must be smaller than 30 characters"})
})