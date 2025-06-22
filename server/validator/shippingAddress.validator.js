import mongoose from "mongoose";
import z from "zod";

export const shippingAddressSchema = z.object({

    fullName: z.string({required_error: "Full name is required"})
    .trim()
    .min(3,{message: "Full name must be of atleast 3 character long"})
    .max(255, {message: "Full name must be smaller than 255 characters"}),

    phone: z.string({required_error: "Phone number is required"})
    .trim()
    .min(10, {message: "phone number must be atleast of 10 digits"})
    .max(12,{message: "phone number be smaller than 12 digits"}),

    addressLine1: z.string({required_error: "Address is required"})
    .trim()
    .min(3,{message: "Address must be of atleast 3 character long"})
    .max(500, {message: "Address must be smaller than 255 characters"}),

    city: z.string({required_error: "City is required"})
    .trim()
    .min(3,{message: "City name must be of atleast 3 character long"})
    .max(255, {message: "City name must be smaller than 255 characters"}),

    state: z.string({required_error: "State name is required"})
    .trim()
    .min(3,{message: "State name must be atleast of 3 character long"})
    .max(255, {message: "State name must be smaller than 255 characters"}),

    postalCode: z.string({required_error: "Postal code is required"})
    .trim()
    .min(6,{message: "Postal code must be atleast of 7 character long"})
    .max(255, {message: "Postal code must be smaller than 10 characters"}),

    country:z.string({required_error: "Country is required"})
    .trim()
    .min(3,{message: "Country must be of atleast 3 character long"})
    .max(255, {message: "Country name must be smaller than 255 characters"}),
})