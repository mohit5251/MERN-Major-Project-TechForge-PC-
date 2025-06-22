/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { createCODOrder, createRazorPayOrder, verifyPayment } from "../API/ApiServices";
import { useAuth } from "../store/AuthUser";

export const CheckOutPage = () => {
    
    const navigate = useNavigate();
    const {refetchCart, user} = useAuth();

    useEffect(() => {

        const cartTotal = Number(localStorage.getItem("cartTotal"));
        const paymentMethod = localStorage.getItem("paymentMethod");

        if(paymentMethod === "razorpay"){
            loadRazorPay(cartTotal);
        }else{
            // paymentMethod == "COD"
            handleCODOrder(cartTotal, paymentMethod);
        }
    }, [])


    //COD Order Hnadle
    const handleCODOrder = async(amount, paymentMethod) => {
        try {
            const response = await createCODOrder({totalAmount: amount, paymentMethod: paymentMethod});

            if(response.status === 200){
                toast.success("Order Placed Successfully (COD)!");
                refetchCart();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while placing COD order");
        }
    }


    //RazorPay section opening logic
    const loadRazorPay = async(amount) => {
        try {
            
            const response = await createRazorPayOrder(amount);
            if(response.status === 200){
                console.log(response.data.orderId);
            }

            //Options of razor pay 
            const options = {
                key: import.meta.env.VITE_RAZOR_KEY,      //Mendatory
                amount: response.data.amount,           //Mendatory
                currency: response.data.currency,       //Mendatory
                name: "TechForgePc",                    //Mendatory
                description: "Order Payment",
                order_id: response.data.orderId,        //Mendatory

                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone,
                },

                handler: async (response) => {

                    //Verify the Payment Signature and Storing OrderData
                    try {
                        const res = await verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            totalAmount: amount,
                            paymentMethod: localStorage.getItem("paymentMethod"),
                        });


                        if(res === 200){
                            console.log(res?.data);
                            refetchCart();
                            toast.success(res?.data?.message);
                        }

                        
                    } catch (error) {
                        toast.error("Payment verification failed");
                        console.log(error);
                    }

                    toast.success("Payment Successful!");

                    
                    navigate("/");
                },

                 
                modal: {
                    ondismiss: () => {
                        // Razorpay popup closed/cancelled
                        toast.info("Payment was cancelled.");
                        navigate("/cart/payment");
                    },
                },
                theme: {
                    color: "#0d6efd",
                },
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.log("Razorpay init error", error);
        }
    }

    return <div className="container my-5 text-center">Processing Payment...</div>;
}