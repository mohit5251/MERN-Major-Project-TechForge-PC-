import z from "zod";

export const categorySchema = z.object({
    categoryName: z.string({required_error: "Category name is required"})
    .trim()
    .min(3,{message: "Category name must be atleast of 3 character long"}),

    subCategory: z.string({required_error: "Sub Category is required"})
    .trim()
    .min(3,{message: "Sub category name must be atleast of 3 character long"}),

    categoryDesc: z.string({required_error: "Category Description is required"})
    .trim()
    .min(3,{message: "Category description name must be atleast of 3 character long"}),
})