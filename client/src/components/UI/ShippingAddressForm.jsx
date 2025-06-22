import { toast } from "react-toastify";
import { updateShippingAddress } from "../../API/ApiServices";
import { useNavigate } from "react-router-dom";

export const ShippingAddressForm = ({formData, handleChange, handleSubmit, loading, editMode}) => {
    
    const navigate = useNavigate();
    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            const response = await updateShippingAddress(formData);
            if(response.status === 200){
                toast.success(response.data.message);
                navigate("/cart/payment");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.extraDetails ? error.response.data.extraDetails : error.response.data.message);
        }

    }

    return(
        <form onSubmit={editMode ? handleUpdate : handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="col-12">
                    <label className="form-label">Address Line 1</label>
                    <input type="text" className="form-control" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">State</label>
                    <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Postal Code</label>
                    <input type="text" className="form-control" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>

                <div className="col-12">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                </div>

                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? "Saving..." : "Save Address"}</button>
                </div>
            </form>
    )
}