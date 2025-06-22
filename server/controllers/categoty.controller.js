import { category } from "../models/Category.model.js";

export const InsertCategory = async(req, res) =>{

    try {
        //1. check if user is ADMIN
        if(!req.user.isAdmin) return res.status(403).json({message: "you are not Admin"});

        //2.  get data from req.body
        const {categoryName, subCategory, categoryDesc} = req.body;

        //3.  getting file path from req.file
        if(!req.file) return res.status(400).json({message : "Image file is required"});

        const image = req.file.path;

        //4.  find subCategory to ensure it is unique
        const isExists = await category.findOne({ subCategory });

        if(isExists) return res.status(400).json({message: "subCategory already Exists, Add new one"});

        //5. create new category
        const response = await category.create({categoryName, subCategory, categoryDesc, image});

        if(response){
            console.log(response);
            return res.status(200).json({message: "Category added successfully"});
        }

    } catch (error) {
        console.log("error in insert category",error);
        return res.status(500).json({message: "Error occurs while Adding category"});
    }  

} 


//Fetch all category data from DB
export const displayCategory = async(req, res) => {
    try {

        // Fetch categories
        const response = await category.find();

        // If no categories found
        if (!response || response.length === 0) {
        return res.status(200).json({ message: "No category found."});
        }

        // Send success response
        return res.status(200).json(response);

    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({ message: "An error occurred while fetching category data." });
    }
}


//Infinite Scroll on category logic
export const InfiniteCategory = async(req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const skip = (page - 1) * limit;

    const response = await category.find().limit(limit).skip(skip);

    if(!response || response.length === 0) return res.status(200).json({message: "No category found", category: []});

    return res.status(200).json({category : response});
}



//Delete category Logic
export const deleteCategory = async(req, res) => {
    try {
        const {id} = req.params;

        const categoryData = await category.findOne({ _id: id});

        if(!categoryData) return res.status(200).json({message: "Category not found"});

        const response = await category.deleteOne({ _id : categoryData._id });

        if(!response) return res.status(500).json({message: "Error occurs while deleting"});

        return res.status(200).json({message: "Category deleted successfully"});
    } catch (error) {
        console.log("error deleting category", error);
        return res.status(500).json({message: "Error occurs while deleting"});
    }
}


//get Single category by ID
export const getSingleCategory = async(req, res) => {

    try {
        const {id} = req.params;

        const data = await category.findOne({ _id: id });

        if(!data) return res.status(404).json({message: "category not found"});

        return res.status(200).json({category: data});
    } catch (error) {
        console.log("error on get sigle category :",error);
        return res.status(500).json({message: "Error occurs while fetching data"});
    }
}



//update category logic
export const updateCategory = async(req, res) => {
    try {
        const {id} = req.params;

        const {categoryName, subCategory, categoryDesc } = req.body;

        const categoryData = await category.findOne({ _id : id });

        const image = req.file?.path || categoryData.image;

        if (!categoryData) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updatedData = await category.updateOne({ _id: categoryData._id }, 
            {$set : {categoryName, subCategory, categoryDesc, image}}
        );

        if(!updatedData) return res.status(400).json({message: "Error occur while updating"});

        return res.status(200).json({message: "Category updated successfully"});

    } catch (error) {
        console.log("error while updating : ",error);
        return res.status(500).json({message: "Error occurs while updating data"});
    }
    
}