import { preBuildPc } from "../models/preBuildPc.model.js";
import { product } from "../models/product.model.js";


//Insert PCs Logic
export const InsertPC = async(req, res) => {
    try {
        //Getting data from req.body
        const {name, price, processor, motherBoard, ram, graphicsCard, cpuCooler, ssd, smps, others, cabinet} = req.body;

        //check if req.files exists
        if(!req.file) return res.status(400).json({message: "Image is Required"});

        const image = req.file.path;

        //find if data already exists
        // const pcData = await preBuildPc.findOne({name});

        // if(pcData) return res.status(400).json({message: "Name already exists enter new one"});

        const response = preBuildPc.create({name, price, processor, motherBoard, ram, graphicsCard, cpuCooler, ssd, smps, others, cabinet, image});

        if(!response) return res.status(400).json({message: "Error Occurs while inserting Pc data"});

        return res.status(200).json({message: "Pc inserted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


//Infinite display Logic
export const infinitePCs = async(req, res) => {
    try {
        //Getting page and limit from Query Param
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        //Skip data logic
        const skip = (page - 1) * limit;

        //fetching data
        const response = await preBuildPc.find().limit(limit).skip(skip);

        if(!response || response.length === 0) return res.status(400).json({message: "No Pc data found", pcs: []});

        return res.status(200).json({pcs : response});
    } catch (error) {
        console.log("PCs display error: ",error);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const deletePc = async(req, res) => {
    try {
        //getting id from req.param
        const {id} = req.params;
        
        //Deleting PC data
        const response = await preBuildPc.deleteOne({ _id : id});

        if(!response) return res.status(400).json({message: "Error occurs while Deleteing the Pc"});

        return res.status(200).json({message: "Pc Data Deleted Successfully"})
        
    } catch (error) {
        console.log("Error deleting Pcs", error);
        return res.status(500).json({message: "Internal Server error on Deleting pcs"});
    }
} 


// get Single Pc Data
export const getSinglePc = async(req, res) => {
    try {
        //getting id from req.param
        const {id} = req.params;

        //finding PC data by ID
        const pcData = await preBuildPc.findOne({ _id: id });

        if(!pcData || pcData.length < 0) return res.status(400).json({message: "Pc Data not found"});

        return res.status(200).json({ pcData : pcData});
    } catch (error) {
        console.log("error on getSinglePc Data", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}


//Update pc Data
export const updatePc = async(req, res) =>{
    try {
        //getting id from route param
        const {id} = req.params;

        //getting data from req.body
        const {name, price, processor, motherBoard, ram, graphicsCard, cpuCooler, ssd, smps, others, cabinet} = req.body;

        //find if pc exists
        const pcData = await preBuildPc.findOne({ _id: id });

        if(!pcData) return res.status(400).json({message: "Pc Data not found"});

        //getting img from req.file or data base
        const image = req.file?.path || pcData.image; 

        //updating PC data
        const response = await preBuildPc.updateOne({ _id : pcData._id}, 
            {$set: {name, price, processor, motherBoard, ram, graphicsCard, cpuCooler, ssd, smps, others, cabinet, image}}
        )

        if(!response) return res.status(400).json({message: "Error occurs while Updating Pc Data"})

        return res.status(200).json({message: "PC Data Updated Successfully"});

    } catch (error) {
        console.log("error while Updating pc", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}




//Details of all Products and PCs
export const detailsOfall = async(req, res) => {
    try {
        const name = req.params.name; 


        //Waiting for promise to return
        const [productData, pc] = await Promise.all([
            product.findOne({ name }),
            preBuildPc.findOne({ name }),
        ])

        if(!productData && !pc) return res.status(400).json({message: "Product not found"});

        //return product or pc what ever found
        return res.status(200).json( productData || pc );

    } catch (error) {
        console.log("Error getting Deatils :", error);
        return res.status(500).json({message: "Internal Server Error on Details"})
    }
}





//Search Products Globally
export const searchProducts = async(req, res) => {
    try {
        const query = req.query.query;

        if(!query || query.trim() === ""){
            return res.status(400).json({message: "Search query is required"});
        }

        const regex = new RegExp(query, "i");  // case-insensitive partial match 

        const [productData, pc] = await Promise.all([
            product.find({ name: regex }),
            preBuildPc.find({ name: regex })
        ])

        if(!productData.length && !pc.length) return res.status(400).json({message: "No data found"});

        // Combining data of two results
        return res.status(200).json({ result : [...productData, ...pc]});


    } catch (error) {
        console.log("search error : ",error);
        return res.status(500).json({message: "Internal Server Error on Search Data"});
    }
}