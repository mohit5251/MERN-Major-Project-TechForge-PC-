import z from "zod";

export const productSchema = z.object({
    name: z.string({required_error: "Product name is required"})
    .trim()
    .min(3, {message: "Product name must be atleast of 3 characters"})
    .max(256,{message: "Product name must be smaller than 256 characters"}),

    subCategory: z.string({required_error: "Category is required"})
    .trim()
    .min(3, {message: "Category name must be atleast of 3 characters"})
    .max(256,{message: "Category name must be smaller than 256 characters"}),

    brand: z.string({required_error: "Brand name is required"})
    .trim()
    .min(3, {message: "Brand name must be atleast of 3 characters"})
    .max(256,{message: "Brand name must be smaller than 256 characters"}),

    price: z.string({required_error: "Price is required"})
    .trim(),
    
    stock: z.string({required_error: "Stock is required"})
    .trim(),

     // ✅ Add this field to accept JSON string
    specifications: z.string({ required_error: "Specifications are required" })
        .refine((val) => {
            try {
                JSON.parse(val);
                return true;
            } catch {
                return false;
            }
        }, {
            message: "Specifications must be a valid JSON string",
        })

})