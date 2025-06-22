import { useEffect, useState } from "react";
import { addShippingAddress, getShippingAddress } from "../API/ApiServices";
import { toast } from "react-toastify";
import { ShippingAddressForm } from "../components/UI/ShippingAddressForm";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/layout/Loading";
import { useAuth } from "../store/AuthUser";


export const ShippingAddress = () => {

    const {user} = useAuth();

    const[loading, setLoading] = useState(false);
    const[existingAddress, setExistingAddress] = useState(null);
    const[initialLoading, setInitialLoading] = useState(false);
    const[editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: user?.phone,
        addressLine1: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    });

    const navigate = useNavigate();


    //get Shipping data
    useEffect(() => {
        setInitialLoading(true);

        //get Shipping data
        const fetchShippingData = async() => {
            try {
                const response = await getShippingAddress();
                if(response.status === 200){
                    setFormData({
                        fullName: response?.data?.shippingData?.fullName || "",
                        phone: response?.data?.shippingData?.phone || String(user.phone),
                        addressLine1: response?.data?.shippingData?.addressLine1 || "",
                        city: response?.data?.shippingData?.city || "",
                        state: response?.data?.shippingData?.state || "",
                        postalCode: response?.data?.shippingData?.postalCode || "",
                        country: response?.data?.shippingData?.country || "India",
                    })

                    setExistingAddress(response?.data?.shippingData);

                    setInitialLoading(false);
                }else{
                    setExistingAddress(null);
                    setInitialLoading(false);
                }
            } catch (error) {
                console.log(error);   
            }
        }

        fetchShippingData();
    }, [user])


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev,[name]: value }));
    };


    //Handle Add Shipping Address
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await addShippingAddress(formData);
            if(response.status === 200){
                toast.success(response.data.message);
                setLoading(false);
                navigate("/cart/payment");
            }
        } catch (error) {
            console.log(error);
            const erMsg = error.response.data;
            toast.error(erMsg.extraDetails ? erMsg.extraDetails : erMsg.message);
        } finally{
            setLoading(false);
        }
    };
    
    

    return (
        <div className="container my-4">
            
        <div className="mb-3" style={{display: "flex", alignItems: "center"}}>

            <button className="me-4 mb-1" type="button" style={{ border: "none" }} onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
            </button>

            <h3>Shipping Address</h3>
        </div>
        

            {
                initialLoading ? ( <Loading /> )

                : editMode ? (
                    <ShippingAddressForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} editMode={editMode}/>
                )

                : existingAddress ? (
                    <div className="p-3 border rounded container">
                        <h5>Shipping To:</h5>
                        <p>Name : {existingAddress.fullName} , Phone No : {existingAddress.phone}</p>
                        <p>{existingAddress.addressLine1}, {existingAddress.city}, {existingAddress.state}</p>
                        <p>{existingAddress.postalCode}, {existingAddress.country}</p>

                        <div className="mt-3 d-flex gap-2">
                        <button className="btn btn-success" onClick={() => navigate("/cart/payment")}>
                            Use This Address
                        </button>
                        <button className="btn btn-outline-secondary" onClick={() => setEditMode(true)}>
                            Edit Address
                        </button>
                        </div>
                    </div>
                ) : (
                    <ShippingAddressForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} loading={loading} editMode={editMode}/>
                )
            }

            
        </div>
    );
};
