import { useEffect } from "react"
import { getOrders } from "../API/ApiServices";
import { useState } from "react";
import { Loading } from "../components/layout/Loading";
import { useNavigate } from "react-router-dom";

export const OrdersPage = () => {

    const[orders, setOrders] = useState([]);
    const[loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async() => {
            try {
                const response = await getOrders();
                if(response.status === 200){
                    setOrders(response?.data?.orderData || []);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally{
                setLoading(false);
            }
        }
        fetchOrders();
    }, [])

    if(loading){
        return <Loading />
    }
    

    return (
        <div className="container order-page-wrapper py-4">


            <div className="productBack-head">
        
                <button type="button" className="mb-3" onClick={() => navigate(-1)} style={{border: "none"}}>
                    <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
                </button>

                <h2 className="mb-4 text-center">My Orders</h2>
            </div>
            
            
            {
                orders.length === 0 ? (
                    <div className="alert alert-info text-center">No orders found.</div>
                ): (    
                orders?.map((order) => (
                    <div key={order?._id} className="order-card card mb-5 shadow-sm">
                        <div className="card-header text-white d-flex justify-content-between gap-3" style={{backgroundColor: "#6366f1"}}>
                            <span>Order ID: {order?._id}</span>
                            <span>Status: <strong className={`text-uppercase badge ${order?.paymentStatus == "paid" ? "bg-success" : "bg-warning"}`}>{order?.paymentStatus}</strong></span>
                        </div>


                        {/* Boostrap Accordion */}
                        <div className="accordion" id="accordionExample" >

                        {/* Address */}
                        <div className="accordion-item">
                            <h2 className="accordion-header"  id={`headingAddress-${order._id}`}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseAddress-${order._id}`} aria-expanded="false" aria-controls={`collapseAddress-${order._id}`}>
                                    Address
                                </button>
                            </h2>

                            <div id={`collapseAddress-${order._id}`} className="accordion-collapse collapse" >
                                <div className="accordion-body">

                                    <div className="card-body">
                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()} </p>
                                        <p><strong>Payment Method:</strong> {order?.paymentMethod}</p>
                                        <p><strong>Total:</strong> ₹{order?.totalAmount?.toLocaleString("en-IN")}</p>

                                        <h6 className="mt-4">Shipping Address</h6>
                                        <p className="mb-1">{order?.shippingAddress?.fullName}, {order?.shippingAddress?.phone}</p>
                                        <p className="mb-1">{order?.shippingAddress?.addressLine1}</p>
                                        <p className="mb-1">{order?.shippingAddress?.city}, {order?.shippingAddress?.state} - {order?.shippingAddress?.postalCode}</p>
                                        <p className="mb-0">{order?.shippingAddress?.country}</p>

                                    </div>
                                </div>

                            </div>
                        </div>


                            {/* Items */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`headingItems-${order._id}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseItems-${order._id}`} aria-expanded="true" aria-controls={`collapseItems-${order._id}`}>
                                        Items & Total : ₹{order?.totalAmount?.toLocaleString("en-IN")}
                                    </button>
                                </h2>
                                <div id={`collapseItems-${order._id}`} className="accordion-collapse collapse show"  aria-labelledby={`headingItems-${order._id}`}>
                                    <div className="accordion-body">
                                    <h6 className="mt-4">Items:</h6>
                                        <ul className="list-group">

                                            {
                                                order?.items?.map((item) => (
                                                <li key={item?.itemId} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img src={item?.image} alt={item?.name} className="order-item-img me-3" />
                                                        <div>
                                                            <p className="mb-0">{item?.name.length > 40 ? item?.name?.slice(0,40) + "..." : item?.name}</p>
                                                            <small>Qty: {item?.quantity}</small>
                                                        </div>
                                                    </div>
                                                    <span className="fw-bold">₹{item?.price}</span>
                                                </li>
                                                ))
                                            }

                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                        

                    </div> 

                </div>
                ))
            )
            }
                
               
        </div>
    )
}