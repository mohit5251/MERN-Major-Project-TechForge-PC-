import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { forgetResetPassword } from "../API/ApiServices";
import { toast } from "react-toastify";

export const ForgotPasswordToken = () => {

    const {token} = useParams();

    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setPassword((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const response = await forgetResetPassword(token, password);
            setLoading(false);
            if(response.status === 200){
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.extraDetails)
        }
    }
    

    return (
        <div className="HTMLcontainer">
            <form method="post" className="LoginForm" onSubmit={handleSubmit}>
                <h2>Set New Password</h2>
                
                <div className="form-ele">
                    <label>New Password</label>
                    <input type="password" name="newPassword" placeholder="Enter new password" required value={password.newPassword} onChange={handleInput}/>
                </div>

                <div className="form-ele">
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" placeholder="Confirm your new password" required value={password.confirmPassword} onChange={handleInput}/>
                </div>

                <div className="form-ele">
                <button type="submit" disabled={!loading}>{loading ? "Reset Password" : "Reseting..."}</button>
                </div>

                <div className="register-link">
                <NavLink to="/login">Back to Login</NavLink>
                </div>
            </form>
        </div>
    )
}