import { shippingAddress } from "../models/shippingAddress.mode.js";

export const addShippingAddress = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        const {userId} = req.user;

        const {fullName, phone, addressLine1, city, state, postalCode, country} = req.body;

        const response = await shippingAddress.create({userId, fullName, phone, addressLine1, city, state, postalCode, country});

        if(!response) return res.status(400).json({ message: "Error occurs while adding data"});

        return res.status(200).json({message: "Address added successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


//Get Shipping address Logic
export const getShippingAddress = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        const {userId} = req.user;

        const shippingData = await shippingAddress.findOne({ userId });

        if(!shippingAddress) return res.status(404).json({message: "No shipping address found"});

        return res.status(200).json({shippingData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server error"});
    }
}


//update Shipping Address
export const updateShippingAddress = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        const {userId} = req.user;

        const {fullName, phone, addressLine1, city, state, postalCode, country} = req.body;

        const response = await shippingAddress.updateOne({ userId },
            {$set: { fullName, phone, addressLine1, city, state, postalCode, country }}
        )

        if(!response) return res.status(400).json({message: "Error occurs while updating"});

        return res.status(200).json({message: "Address updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

