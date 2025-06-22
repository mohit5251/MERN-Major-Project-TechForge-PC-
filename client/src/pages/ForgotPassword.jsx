import { useState } from "react"
import { NavLink } from "react-router-dom"
import { forgotPassEmail } from "../API/ApiServices";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthUser";
import { useEffect } from "react";

export const ForgotPassword = () => {

    const {user} = useAuth();

    const[data, setData] = useState({
        email: user?.email,
    });

    // Load email from user only once
    useEffect(() => {
        if (user?.email) {
            setData({ email: user.email });
        }else{
            setData({ email: "" });
        }
    }, [user]);

    const[loading, setLoading] = useState(true);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(false);
        console.log("forgot-pass email :",data);
        
        try {
            const response = await forgotPassEmail(data);
            if(response.status === 200){
                setLoading(true);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    return (
        <div className="HTMLcontainer">
        <form method="post" className="LoginForm" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <div className="form-ele">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Enter your registered email" required value={data.email} onChange={handleInput}/>
            </div>
            <div className="form-ele">
                <button type="submit" disabled={!loading}>{loading ? "Send Link" : "Sending..."}</button>
            </div>
            <div className="register-link">
            Remember your password? <NavLink to="/login">Login</NavLink>
            </div>
        </form>
        </div>
    )
}