import z from "zod";

export const pcSchema = z.object({
    name: z.string({required_error: "name is required"})
    .trim()
    .min(3, {message: "PC name must be atleast of 3 characters"})
    .max(256,{message: "PC name must be smaller than 256 characters"}),

    price: z.string({required_error: "Price is required"})
    .trim(),

    processor: z.string({required_error: "Processor is required"})
    .trim()
    .min(3, {message: "Processor name must be atleast of 3 characters"})
    .max(256,{message: "Processor name must be smaller than 256 characters"}),

    motherBoard: z.string({required_error: "Processor is required"})
    .trim()
    .min(3, {message: "MotherBoard name must be atleast of 3 characters"})
    .max(256,{message: "MotherBoard name must be smaller than 256 characters"}),

    ram: z.string({required_error: "Ram is required"})
    .trim()
    .min(3, {message: "Ram name must be atleast of 3 characters"})
    .max(256,{message: "Ram name must be smaller than 256 characters"}),

    graphicsCard: z.string({required_error: "GraphicsCard is required"})
    .trim()
    .min(3, {message: "GraphicsCard name must be atleast of 3 characters"})
    .max(256,{message: "GraphicsCard name must be smaller than 256 characters"}),
    
    cpuCooler: z.string({required_error: "cpuCooler is required"})
    .trim()
    .min(3, {message: "cpuCooler name must be atleast of 3 characters"})
    .max(256,{message: "cpuCooler name must be smaller than 256 characters"}),
    
    ssd: z.string({required_error: "SSD is required"})
    .trim()
    .min(3, {message: "SSD name must be atleast of 3 characters"})
    .max(256,{message: "SSD name must be smaller than 256 characters"}),
    
    smps:z.string({required_error: "SMPS is required"})
    .trim()
    .min(3, {message: "SMPS name must be atleast of 3 characters"})
    .max(256,{message: "SMPS name must be smaller than 256 characters"}),
    
    others:z.string({required_error: "Others is required"})
    .trim()
    .min(3, {message: "Others must be atleast of 3 characters"})
    .max(256,{message: "Others must be smaller than 256 characters"}),
    
    cabinet:z.string({required_error: "Cabinet is required"})
    .trim()
    .min(3, {message: "Cabinet name must be atleast of 3 characters"})
    .max(256,{message: "Cabinet name must be smaller than 256 characters"}),
})