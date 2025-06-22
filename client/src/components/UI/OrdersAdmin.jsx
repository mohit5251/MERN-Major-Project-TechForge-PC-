/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { useEffect } from "react"
import { getAllOrders } from "../../API/ApiServices";
import { Loading } from "../layout/Loading";

export const OrdersAdmin = ({setProfit}) => {

    const[orders, setOrders] = useState([]);
    const[loading, setLoading] = useState(false);

    //Fetching Orders Data
    useEffect(() => {
        const fetchOrder = async() => {
            try {
                const response = await getAllOrders();
                if(response.status === 200){
                    const orderList = response?.data?.orderData || [];

                    setOrders(response?.data?.orderData || []);

                    // Calculate profit ONLY for paid orders
                    const profitAmt = orderList
                    .filter((order) => order.paymentStatus === "paid")
                    .reduce((acc, order) => acc + order.totalAmount, 0);

                    setProfit(profitAmt);
    
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            } finally{
                setLoading(false);
            }
        }

        fetchOrder();
    },[])

    if(loading){
        return <Loading />
    }
   
    

    return (
        <div className="table-responsive mt-5">
            <h4 className="mb-3 ms-3">All Orders</h4>
            <table className="table custom-order-table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Payment Method</th>
                    <th>Payment ID</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">No Orders</td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index+1}</td>
                                <td>{order?.paymentMethod}</td>
                                <td>{order?.razorpayPaymentId ? order?.razorpayPaymentId : "-"}</td>
                                <td>{order?.items?.length}</td>
                                <td>{order?.totalAmount.toLocaleString("en-IN")}</td>
                                <td>
                                    <span className={`badge bg-${order.paymentStatus === "paid" ? "success" : "warning"}`}>
                                    {order?.paymentStatus}
                                    </span>
                                </td>
                                <td>{new Date(order?.createdAt).toLocaleString() }</td>
                                <td>{order?.userId}</td>
                            </tr>
                        )
                        
                        ))
                    }
            </tbody>
            </table>
      </div>
    )
}