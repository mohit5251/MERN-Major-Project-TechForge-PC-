import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../API/ApiServices";
import { toast } from "react-toastify";

export const UpdateUser = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    
    const[user, setUser] = useState({
        name : "",
        email : "",
        phone : "",
        isEmailValid : "",
        isAdmin : "",
    })

    useEffect(() => {

       const fetchUser = async() => {
         try {
            const response = await getSingleUser(id);
            if(response.status === 200){
                setUser({
                    name: response?.data?.userData?.name,
                    email: response?.data?.userData?.email,
                    phone: String(response?.data?.userData?.phone),
                    isEmailValid: Boolean(response?.data?.userData?.isEmailValid),
                    isAdmin: Boolean(response?.data?.userData?.isAdmin),
                })
            }
        } catch (error) {
            console.log(error);
        }
       }

       fetchUser();
    }, [id])

   

    const handleChange = (e) => {
        const {name, value} = e.target;

        const booleanFields = ["isEmailValid", "isAdmin"];

        setUser((prev) => ({...prev , [name] : booleanFields.includes(name) ? value === "true" : value }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

         try {
            const response = await updateUser(id,user);
            if(response.status === 200){
                toast.success(response?.data?.message);
                navigate("/admin/users");
                setLoading(false);
            }
         } catch (error) {
            console.log("error while updating user : ", error);
            const backError = error?.response?.data;
            toast.error(backError?.extraDetails ? backError?.extraDetails : backError?.message);
         } finally{
            setLoading(false);
         }
    }
    

    return (
        <div className="form-container">
            <h2 className="form-title">Update PC Data</h2>
            <form className="category-form" method="post" onSubmit={handleSubmit}>
                
                {/* name */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Name <span className="required">*</span>
                    </label>
                    <input type="text" name="name" className="form-input" placeholder="Enter name" required value={user.name} onChange={handleChange}/>
                </div>


                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email <span className="required">*</span>
                    </label>
                    <input type="text" name="email" className="form-input" placeholder="Enter email" required value={user.email} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                        Phone <span className="required">*</span>
                    </label>
                    <input type="text" name="phone" className="form-input" placeholder="Enter phone number" required value={user.phone} onChange={handleChange}/>
                </div>


                <div className="form-group">
                    <label htmlFor="isEmailValid" className="form-label">
                        isEmailValid <span className="required">*</span>
                    </label>
                    <div className="form-input">
                        <label style={{ marginRight: "10px" }}>
                            <input type="radio" name="isEmailValid" value="true" checked={user.isEmailValid === true} onChange={handleChange}/> True
                        </label>
                        <label className="ms-5">
                            <input type="radio" name="isEmailValid" value="false" checked={user.isEmailValid === false} onChange={handleChange}/> False
                        </label>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="isAdmin" className="form-label">
                        isAdmin <span className="required">*</span>
                    </label>
                    <div className="form-input">
                        <label style={{ marginRight: "10px" }}>
                            <input type="radio" name="isAdmin" value="true" checked={user.isAdmin === true} onChange={handleChange}/> True
                        </label>
                        <label className="ms-5">
                            <input type="radio" name="isAdmin" value="false" checked={user.isAdmin === false} onChange={handleChange}/> False
                        </label>
                    </div>
                </div>



                {/* Form Actions */}
                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading} >
                        {loading ? "Updating..." : "Update User Data"}
                    </button>
                </div>
            </form>
        </div>
    )
}