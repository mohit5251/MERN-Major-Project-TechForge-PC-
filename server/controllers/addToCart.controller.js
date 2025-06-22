import { cart } from "../models/cart.model.js";

export const addToCart = async(req, res) => {

    try {
       
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        if(!req.user.isEmailValid) return res.status(403).json({message: "Mail is not verified"});

        //getting data from body
        const {itemId, name, price, image, quantity=1} = req.body;

        if(!itemId || !name || !price || !image || !quantity){
            return res.status(400).json({message: "Missing required fields"});
        }

        // Find or create cart
        let userCart = await cart.findOne({ userId : req.user.userId });

        if(!userCart){

            // Create new cart if it doesn't exist
            userCart = await cart.create({
                userId: req.user.userId,
                items: [{
                    itemId,
                    name,
                    price,
                    image,
                    quantity,
                }]
            })

            return res.status(200).json({message: "Item added to Cart", cart: userCart})
        }


        // Check if item already exists
        const isExists = userCart.items.find(item => item.itemId.toString() === itemId);

        if(isExists){
            // If item exists, increment quantity
            isExists.quantity += parseInt(quantity, 10);
        }else{
        // If not, push new item
            userCart.items.push({
                itemId,
                name,
                price,
                image,
                quantity,
            });
        }

        await userCart.save();

        return res.status(200).json({ message: "Item added to Cart", cart: userCart });
    } catch (error) {
        console.error("Add to cart error:", error);
        return res.status(500).json({ message: "Something went wrong." });   
    }

}




//display Cart Data
export const displayCart = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        if(!req.user.isEmailValid) return res.status(403).json({message: "Mail is not verified"});

        const userCart = await cart.findOne({ userId : req.user.userId });

        if(!userCart) return res.status(404).json({message: "Cart is Empty"});

        return res.status(200).json({ cart : userCart});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });   
    }
}


//Delete Cart Item
export const deleteCartItem = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        if(!req.user.isEmailValid) return res.status(403).json({message: "Mail is not verified"});

        const {id} = req.params;

        const result = await cart.updateOne({ userId : req.user.userId },
            { $pull: { items: {itemId : id} } }
        );

        if(!result) return res.status(404).json({message: "Item not found in cart"});

        return res.status(200).json({message: "Item removed from cart"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}


//Update cart Quantity
export const updateCart = async(req, res) => {
    try {
        if(!req.user) return res.status(401).json({message : "Please Login to Use this Feature"});

        if(!req.user.isEmailValid) return res.status(403).json({message: "Mail is not verified"});

        const {itemId} = req.params;
        const { action } = req.body;

        const cartData = await cart.findOne({ userId: req.user.userId });
        
        if(!cartData) return res.status(404).json({message: "Cart not found"});

        // Find the item in cart.items array by itemId
        const item = cartData.items.find(i => i.itemId.toString() === itemId);

        if (!item) return res.status(404).json({ message: "Item not found in cart" });

        if(action === "increment"){
            item.quantity += 1;
        }else if(action === "decrement"){
            item.quantity = Math.max(1, item.quantity - 1);  // Prevent going below 1
        } else {
            return res.status(400).json({ message: "Invalid action type." });
        }

        await cartData.save();

        res.status(200).json({ message: "Quantity updated", item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
}