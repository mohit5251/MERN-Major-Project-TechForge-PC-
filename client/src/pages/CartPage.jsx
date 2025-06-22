/* eslint-disable react-hooks/exhaustive-deps */
import { FaTrash } from "react-icons/fa"
import { deleteCartItem, updateCart } from "../API/ApiServices"
import { Loading } from "../components/layout/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthUser";
import { useEffect } from "react";

export const CartPage = () => {

    const navigate = useNavigate();

    const {cartData, cartLoading, refetchCart, cartError, cartIsError} = useAuth();

    // const {data, isLoading, refetch, isError, error} = useQuery({
    //     queryKey: ["cartData"],
    //     queryFn: displayCart,
    //     retry: false,
    //     refetchOnWindowFocus: false,
    //     refetchOnMount: false,
    // });
    useEffect(() => {
        refetchCart();
    },[])

    if(cartLoading) return <Loading />

    if(cartIsError) {
        console.log(cartError);
    }

    const items = cartData?.data?.cart?.items || [];

    // const cartData = data?.data?.cart?.items || [];

    //Calculate Total
    const calculateTotals = () => {
        let subtotal = 0;
        let discount = 0;

        items?.forEach(item => {
            const itemPrice = Number(item.price.replace(/,/g, '')); // Fix comma removal
            subtotal += itemPrice * item.quantity;
            // Optional: apply real discount logic
            discount += 0;
        });

        return {
            subtotal,
            discount,
            total: subtotal - discount,
        };
    };

    

    const { subtotal, discount, total } = calculateTotals();


    //handle Delete
    const handleDelete = async(id) => {
        try {
            const response = await deleteCartItem(id);
            if(response.status === 200){
                refetchCart();
                toast.success(response?.data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    //handle Quantity Change
    const handleQuantity = async({itemId , action}) => {
        try {
            const response = await updateCart(itemId, action);
            if(response.status === 200){
                refetchCart();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
         <div className="custom-cart-container container-sm py-3 ">
            <h2 className="text-center mb-4">Your Cart</h2>
            <div className="row">
                <div className="col-md-8 mb-5">
                    <table className="table custom-cart-table table-borderless">
                        <thead>
                            <tr className="text-center">
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="cart-data-body">
                            {
                                items?.length > 0 ? (
                                    items?.map(item => (
                                    <tr key={item._id} className="cart-item-row">
                                        <td className="d-flex align-items-center" onClick={() => navigate(`/details/${encodeURIComponent(item.name)}`)}>

                                            <img src={item.image} alt={item.name} className="cart-product-img me-3" />
                                            <span>{item.name.length > 30 ? item.name.slice(0,40) + "..." : item.name}</span>

                                        </td>
                                        <td className="text-center">
                                            <div className="quantity-controls d-inline-flex align-items-center gap-2">

                                                <button className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={() => handleQuantity({itemId: item.itemId, action: "decrement"})} disabled={item.quantity == 1} >−</button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button className="btn btn-sm btn-outline-secondary px-2 py-1" onClick={() => handleQuantity({itemId: item.itemId, action: "increment"})} >+</button>

                                            </div>
                                        </td>

                                        <td>₹{item.price}</td>
                                        <td onClick={() => handleDelete(item.itemId)}><FaTrash className="text-danger cart-delete-icon" /></td>
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-5">
                                            <h5>Your cart is empty.</h5>
                                            <NavLink to="/" className="btn btn-outline-primary mt-3">
                                                Continue Shopping
                                            </NavLink>
                                        </td>
                                    </tr>
                                )
                                
                            }
                        </tbody>
                    </table>
                </div>

                <div className="col-md-4">
                    <div className="custom-cart-summary p-4 border rounded">
                        <h5 className="mb-4">Cart Totals</h5>
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Discount</span>
                            <span>₹{discount.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold border-top pt-3 mt-3">
                            <span>Total</span>
                            <span>₹{total.toLocaleString("en-IN")}</span>
                        </div>

                        <button className="btn btn-primary w-100 mt-4 checkout-btn" 
                            onClick={() => {
                                localStorage.setItem("cartTotal", total)
                                navigate("/cart/shipping-address");
                            }}
                            disabled={items.length>0 ? false : true}>
                                Proceed to Checkout
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}