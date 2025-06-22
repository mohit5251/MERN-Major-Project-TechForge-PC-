import { product } from "../models/product.model.js";
import { category } from "../models/Category.model.js";
import { response } from "express";

export const insertProducts = async(req, res) => {
    try {
        const {name, subCategory, brand, price, specifications, stock} = req.body;

        const parsedSpecs = JSON.parse(specifications);

        //1.  find category using subCategory
        const categoryData = await category.findOne({ subCategory });

        if(!categoryData) return res.status(404).json({message: "Category not found"});

        //2.  getting file path from req.file
        if(!req.file) return res.status(400).json({message : "Image file is required"});

        const image = req.file.path;

        //3.   Storing data in product table
        const response = await product.create({name, categoryId : categoryData._id , brand, price, image, specifications: parsedSpecs, stock});

        if(!response) return res.status(400).json({message: "Error occurs while inserting products"});
        
        console.log(response);
        
        return res.status(200).json({message: "product inserted successfully"});
    } catch (error) {
        console.log("error while inserting products",error);
        return res.status(500).json({message: "Server error"});
    }
}


//Display Products
export const infiniteProducts = async(req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const {subCategory} = req.params;

    const skip = (page - 1) * limit;

    const categoryData = await category.findOne({subCategory});

    if(!categoryData) return res.status(400).json({message: "No product found for that category"})

    const response = await product.find({ categoryId: categoryData._id }).limit(limit).skip(skip);

    if(!response || response.length == 0) return res.status(200).json({message: "No Products found", products: []});

    return res.status(200).json({products : response});
}


//Display Products Admin page
export const infiniteProductsAdmin = async(req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const skip = (page - 1) * limit;

        const products  = await product.find().limit(limit).skip(skip).sort({ createdAt: -1 });   //sort to newly Added data first show

        if(!response || response.length == 0) return res.status(400).json({message: "No Products found"});

        return res.status(200).json({products : products});
    } catch (error) {
        console.log("Product display : ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}



//delete Products
export const deleteProducts = async(req, res) => {
    try {
        const {id} = req.params;

        const productsData = await product.findOne({ _id : id});

        if(!productsData) return res.status(400).json({message: "Product not found"});

        const deleted = await product.deleteOne({ _id: productsData._id });

        if(!deleted) return res.status(500).json({message: "Error occurs while deleting Product"});

        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log("product delete error: ",error);
        return res.status(500).json({message: "Internal server error"});
    }
}


//Count total no of products
export const totalProducts = async(req, res) => {
    try {
        const count = await product.countDocuments();
        return res.status(200).json({ total : count });
    } catch (error) {
        console.log("total count error: ", error);
        return res.status(500).json({message: "Internal server error"});
    }
}


//get Single Product for UPDATE
export const getSingleProduct = async(req, res) => {
    try {
        const {id} = req.params;

        const productsData = await product.findOne({ _id: id});

        const categoryData = await category.findOne({ _id : productsData.categoryId });

        if(!response) return res.status(400).json({message: "No product found"});

        return res.status(200).json({products : productsData, subcategory: categoryData.subCategory});
    } catch (error) {
        console.log("error on singleProducts: ",error);
        return res.status(500).json({message: "Internal server error"});
    }
}   

export const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;

        const {name, subCategory, brand, price, specifications, stock} = req.body;

        //finding if product exists
        const productData = await product.findOne({ _id: id});
        if(!productData) return res.status(400).json({message: "Product not found"});

        //parse the json Stirng into obj
        const parsedSpecs = JSON.parse(specifications);

        // get new image or keep old one
        const image = req.file?.path || productData.image;

        const updatedData = await product.updateOne({ _id: productData._id },
            {$set : {name, categoryId:productData.categoryId , brand, price, image, specifications:parsedSpecs, stock}}
        );

        if(!updatedData) return res.status(400).json({message: "Error while updating the data"});

        return res.status(200).json({message: "Product Updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server error"});
    }
   
}
