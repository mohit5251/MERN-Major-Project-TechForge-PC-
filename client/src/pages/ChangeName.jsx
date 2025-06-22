import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserName } from "../API/ApiServices";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthUser";

export const ChangeName = () => {

    const {user} = useAuth();

    const {id} = useParams();

    const [userName, setUserName] = useState({
        name: user.name,
    });
    const[loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleInput = (e) => {
        const{name, value} = e.target;
        setUserName((prev) => ({...prev, [name]: value}));   
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await updateUserName(id, userName);
            setLoading(false)
            if(response.status === 200){
                toast.success(response.data.message);
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.extraDetails);
        }

    }

  return (
    <div className="HTMLcontainer">
      <form className="LoginForm" method="post" onSubmit={handleSubmit}>
        <h2>Change Your Name</h2>
        
        <div className="form-ele">
          <label>New Name</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter your new name" 
            required 
            value={userName.name}
            onChange={handleInput}
          />
        </div>
        
        <div className="form-ele">
          <button type="submit" disabled={!loading}>{loading ? "Update" : "Updating..."}</button>
        </div>
      </form>
    </div>
  );
};
