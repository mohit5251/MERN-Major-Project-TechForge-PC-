import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { addToCart } from "../../API/ApiServices"
import { toast } from "react-toastify";
import { useAuth } from "../../store/AuthUser";

export const ProductsCard = ({data, toggleWishlist, wishlist}) => {

    const{refetchCart} = useAuth();

    const handleAddToCart = async() => {
        try {
            const itemData = {
                itemId: data?._id, 
                name: data?.name, 
                price: data?.price, 
                image: data?.image, 
                quantity: 1
            }
            const response = await addToCart(itemData);
            if(response.status === 200){
                toast.success(response.data.message);
                refetchCart();
            }
        } catch (error) {
            console.log(error);
            toast.warn(error.response.data.message);
        }
    }

    return (
        <>
            <NavLink to={`/details/${encodeURIComponent(data.name)}`}>
                <div className="img-container-minimal">
                    <img src={data.image} alt="" />

                    <button onClick={() => toggleWishlist(data)} aria-label="Wishlist">
                        {wishlist[data._id] ? (
                            <FaHeart className="wishlisted" />
                        ) : (
                                <FaRegHeart />
                        )}
                    </button>
                </div>        
            </NavLink>

                <div className="info-minimal">
                    <h3>{data.name}</h3>
                    <span className="brand-minimal">{data.brand}</span>
                    <div className="footer-minimal">
                        <span>₹{data.price}</span>
                        <button onClick={handleAddToCart}>
                            <FaShoppingCart /> Add
                        </button>
                    </div>
                </div>
        </>
    )
}