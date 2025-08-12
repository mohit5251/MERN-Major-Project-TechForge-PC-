import z from "zod";

export const registerSchema = z.object({
    name: z.string({required_error: "Name is required"})
    .trim()
    .min(3,{message: "Name must contain atleast 3 character"})
    .max(20,{message: "Name must be smaller than 20 caharcter"}),

    email: z.string({required_error: "Email is required"})
    .trim()
    .email({message: "please enter valid email address"})
    .max(100,{message: "email must be smaller than 100 characters"}),

    phone: z.string({required_error: "Phone number is required"})
    .trim()
    .min(10, {message: "phone number must be atleast of 10 digits"})
    .max(10,{message: "phone number be smaller than 10 digits"}),

    password: z.string({required_error: "Password is required"})
    .trim()
    .min(7,{message: "Password must be atleast of 7 characters"})
    .max(100,{message: "Password must be smaller than 100 characters"})
})


//for forgot-password
export const emailSchema = z.object({
    email: z.string({required_error: "Email is required"})
    .trim()
    .email({message: "please enter valid email address"})
    .max(100,{message: "email must be smaller than 100 characters"}),
})


//for verify forgot-password validation
export const passwordSchema = z.object({
    newPassword: z.string({required_error: "new Password is required"})
    .trim()
    .min(7,{message: "New Password must be atleast of 7 characters"})
    .max(100,{message: "New Password must be smaller than 100 characters"}),

    confirmPassword: z.string({required_error: "confirm password is required"})
    .trim()
    .min(7,{message: "Confirm Password must be atleast of 7 characters"})
    .max(100,{message: "Confirm Password must be smaller than 100 characters"}),

}).refine((data) => data.newPassword === data.confirmPassword, {message: "Password doesn't match", path:["confirmPassword"] })

//Change Name schema
export const nameSchema = z.object({
    name: z.string({required_error: "Name is required"})
    .trim()
    .min(3,{message: "Name must contain atleast 3 character"})
    .max(20,{message: "Name must be smaller than 20 caharcter"}),
})


//Update User Data Admin 
export const UpdateUserSchema = z.object({
    name: z.string({required_error: "Name is required"})
    .trim()
    .min(3,{message: "Name must contain atleast 3 character"})
    .max(20,{message: "Name must be smaller than 20 caharcter"}),

    email: z.string({required_error: "Email is required"})
    .trim()
    .email({message: "please enter valid email address"})
    .max(100,{message: "email must be smaller than 100 characters"}),

    phone: z.string({required_error: "Phone number is required"})
    .trim()
    .min(10, {message: "phone number must be atleast of 10 digits"})
    .max(12,{message: "phone number be smaller than 12 digits"}),

    isEmailValid: z.boolean({ required_error: "isEmailValid is required" }),

    isAdmin: z.boolean({ required_error: "isAdmin is required" }),

})