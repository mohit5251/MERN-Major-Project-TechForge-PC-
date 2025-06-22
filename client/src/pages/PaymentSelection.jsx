import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentSelection = () => {

    const[paymentType, setPaymentType] = useState("");
    const navigate = useNavigate();

    const handleCheckOut = () => {
        localStorage.setItem("paymentMethod", paymentType);
        navigate("/cart/checkout");
        
    }
    
    return (
        <div className="container my-4">
            <div className="mb-3 d-flex align-items-center">
                <button
                    className="me-3 mb-1"
                    type="button"
                    style={{ border: "none" }}
                    onClick={() => navigate("/cart/shipping-address")}
                >
                    <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
                </button>
                <h3>Select Payment Method</h3>
            </div>

            {/* Payment Options */}
            <div className="card shadow-sm p-4">
                <h5 className="mb-3">Choose how you want to pay:</h5>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cod"
                        onClick={() => setPaymentType("cod")}
                    />
                    <label className="form-check-label" htmlFor="cod" value="cod">
                        Cash on Delivery (COD)
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="razorpay"
                        value="razorpay"
                        onClick={() => setPaymentType("razorpay")}
                    />
                    <label className="form-check-label" htmlFor="razorpay" value="razorpay">
                        Razorpay / UPI / Net Banking / Card
                    </label>
                </div>

                <div className="form-check mb-4">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="paypal"
                        value="paypal"
                        disabled
                    />
                    <label className="form-check-label text-muted" htmlFor="paypal">
                        PayPal (Coming soon)
                    </label>
                </div>

                <button className="btn btn-primary w-100" onClick={handleCheckOut}  disabled={paymentType.length<=0 ? true : false}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};
