import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { addToCart, detailsOfProduct } from "../API/ApiServices";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { Loading } from "../components/layout/Loading";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthUser";

export const Details = () => {

    const {name} = useParams();

    const {refetchCart} = useAuth();

    const navigate = useNavigate();

    const {data, isLoading} = useQuery({
        queryKey: ["details",name],
        queryFn: () => detailsOfProduct(name),
        staleTime: 1000 * 60 * 60 * 5,
    })

    if(isLoading) return <Loading />
    const product = data?.data;

    // Adding to cart Logic
    const handleAddToCart = async() => {
            try {
                const itemData = {
                    itemId: product?._id, 
                    name: product?.name,
                    price: product?.price, 
                    image: product?.image, 
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
        <div className="container details-wrapper py-1">

            <button type="button" className="mb-3" onClick={() => navigate(-1)} style={{border: "none"}}>
                <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
            </button>

            {/* Product image and Name Section */}
            <div className="row details-top">

                <div className="col-md-6 text-center mb-3">
                    <img src={product.image} alt={product.name} className="details-img img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2 className="details-name" style={{textAlign: "left"}}>{product.name}</h2>

                    <h2 className="details-dispatch">Product Dispatch within 24-96 Hours <i className="bi bi-exclamation-circle-fill"></i></h2>

                    <p className="details-price" style={{textAlign: "left"}}>Rs. {product.price}</p>

                    <div className="details-buttons mb-4">
                        <button className="btn-Cart" onClick={handleAddToCart}>
                            <FaShoppingCart /> Add to Cart
                        </button>
                        <button className="btn-Buy">
                            <FaBolt /> Buy Now
                        </button>
                    </div>

                </div>
            </div>


            {/* Specifications Section */}

            <div className="details-specs mt-4">
                <h4>Specifications of {name}</h4>
                <div className="spec-table">
                    {
                        //if product has Specification field and is obj then display this
                        product?.specifications && typeof product?.specifications === "object"

                        ? (
                            Object.entries(product?.specifications).map(([key, value], index) => (
                                <div key={key}
                                className={index % 2 === 0 ? "spec-row spec-grey" : "spec-row spec-white"}
                                >
                                    <span className="spec-key">
                                        {key.replace(/^./, (str) => str.toUpperCase())}
                                    </span>
                                    <span className="spec-value">
                                        {    
                                            String(value).split(";").map((part, index) => (      //give new line after each "," in one value
                                                <span key={index} className="fw-medium">
                                                    {part.trim()}
                                                    <br />
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            ))
                        )

                        : 
                            //Else this
                        Object.entries(product).filter(([key, value]) => 
                            !["_id", "image", "name", "price"].includes(key) && value
                        ).map(([key, value], index) => 
                        (

                            <div key={key}
                            className={index % 2 === 0 ? "spec-row spec-grey" : "spec-row spec-white"}
                            >
                                <span className="spec-key">
                                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                </span>
                                <span className="spec-value">{String(value)}</span>
                            </div>

                        ))
                    }
                </div>
            </div>


        </div>
    )
};