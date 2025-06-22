import Razorpay from "razorpay";
import crypto from "crypto";
import { order } from "../models/order.model.js";
import { cart } from "../models/cart.model.js";
import { shippingAddress } from "../models/shippingAddress.mode.js";
import { sendMail } from "../nodeMailer/nodeMailer.js";

//Instantiating RazorPay
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZOR_KEY,
    key_secret: process.env.RAZOR_SECRET,
});


// Order Creating Logic
export const createRazorPayOrder = async(req, res) => {

    try {

        const { amount } = req.body;
    
        const options = {
            amount : amount * 100,    // ✅ Convert rupees to paise here
            currency: "INR",
            receipt: "order_rcptid_" + new Date().getTime(),
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency})
    } catch (error) {
        console.error("Error in creating Razorpay order", error);
        res.status(500).json({ message: "Payment order failed" });
    }
    
}


//Verify Payment 
export const verifyPayment = async(req, res) => {
    try {
        const {razorpay_payment_id, razorpay_order_id, razorpay_signature, totalAmount, paymentMethod} = req.body;

        const secret = process.env.RAZOR_SECRET;

        // Step 1: Generate HMAC using SHA256 and your secret key
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);

        // Step 2: Generate final digest
        const digest = hmac.digest("hex");

        // Step 3: Compare both signatures
        if(digest === razorpay_signature){

            console.log("Payment verified");

             
            // store the order to DB
            const cartData = await cart.findOne({ userId: req.user.userId});
            const address = await shippingAddress.findOne({ userId: req.user.userId });

            const [orderData, cartDelete] = await Promise.all([

                // Adding Data to order
                order.create({
                    userId: cartData.userId,
                    items: cartData.items,
                    shippingAddress: address,
                    totalAmount: totalAmount,
                    paymentMethod,
                    paymentStatus : paymentMethod === "cod" ? "pending" : "paid",
                    razorpayPaymentId: razorpay_payment_id,
                }),

                //Deleting Cart Data
                cart.deleteOne({ userId: req.user.userId}),

            ])

            //On Successfull Order send Mail
            sendMail({
                to: req.user.email,
                subject: "Order Confirmed",
                html: `
                    <!DOCTYPE html>
                    <html>
                    <body>
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
                        <h2 style="color: green;">✅ Order Confirmed!</h2>
                        <p>Hi ${address.fullName},</p>
                        <p>Your order has been successfully placed.</p>
                        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                        <p><strong>Shipping Address:</strong><br>
                        ${address.addressLine1},<br>
                        ${address.city}, ${address.state} - ${address.postalCode}<br>
                        ${address.country}<br>
                        Phone: ${address.phone}
                        </p>
                        <p style="margin-top:20px;">Thank you for shopping with us!</p>
                    </div>
                    </body>
                    </html>
                `
            })

            return res.status(200).json({ success: true, message: "Order Placed Successfully", order: orderData});
        }else{
            // Signature mismatch
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}


//place COD Order
export const placeCODOrder = async(req, res) => {
    try {
        const {totalAmount, paymentMethod} = req.body;

        const userId = req.user.userId;
        console.log(userId);
        

        const cartData = await cart.findOne({ userId });
        const address = await shippingAddress.findOne({ userId });

        if (!cartData || !address) {
            return res.status(404).json({ message: "Cart or address not found" });
        }

        const [orderData, cartDelete] = await Promise.all([
            order.create({
                userId: cartData.userId,
                items: cartData.items,
                shippingAddress: address,
                totalAmount,
                paymentMethod,
                paymentStatus: "pending", // COD is not yet paid
            }),
            cart.deleteOne({ userId: req.user.userId }),
        ]);

        //On Successfull Order send Mail
            sendMail({
                to: req.user.email,
                subject: "Order Confirmed",
                html: `
                    <!DOCTYPE html>
                    <html>
                    <body>
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
                        <h2 style="color: green;">✅ Order Confirmed!</h2>
                        <p>Hi ${address.fullName},</p>
                        <p>Your order has been successfully placed.</p>
                        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
                        <p><strong>Shipping Address:</strong><br>
                        ${address.addressLine1},<br>
                        ${address.city}, ${address.state} - ${address.postalCode}<br>
                        ${address.country}<br>
                        Phone: ${address.phone}
                        </p>
                        <p style="margin-top:20px;">Thank you for shopping with us!</p>
                    </div>
                    </body>
                    </html>
                `
            })

        return res.status(200).json({ message: "COD Order Placed", order: orderData });

    } catch (error) {
        console.log("Cod ordere Error: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}





// Display Orders UsersWise
export const displayOrders = async(req, res) => {
    try {
        const userId = req.user.userId;

        const orderData = await order.find({ userId }).sort({ _id: -1 });
        
        if(!orderData){
            return res.status(400).json({message: "No Orders found"});
        }

        return res.status(200).json({orderData});

    } catch (error) {
        console.log("Order display error", error);
        res.status(500).json({message: "Internal server error"});
    }
}


//Display All Orders (ADMIN)
export const displayAllOrders = async(req, res) => {
    try {
        const orderData = await order.find().sort({ _id: -1 });
        
        if(!orderData){
            return res.status(400).json({message: "No Orders found"});
        }

        return res.status(200).json({orderData});

    } catch (error) {
        console.log("Order display error", error);
        res.status(500).json({message: "Internal server error"});
    }
}