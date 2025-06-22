import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { registerUser } from "../API/ApiServices";
import { useAuth } from "../store/AuthUser";

export const Register = () => {

    const[user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });
    const [isLoading, setLoading] = useState(false);

    const {refetchAuth} = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser((prev) => ({...prev, [name] : value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        console.log(user);

        try {
            // const response = await fetch("http://localhost:3000/register",{
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(user)
            // })
            // const resData = await response.json();
            const response = await registerUser(user);
            
            if(response.status === 200){
                setUser({
                    name:"",
                    email: "",
                    phone: "",
                    password: "",
                })
                toast.success(response.data.message);
                refetchAuth();
                navigate("/verify-email")
                setLoading(false);
            }
        } catch (error) {
            console.log(error.response.data.extraDetails);
            toast.error(error.response.data.extraDetails ? error.response.data.extraDetails : error.response.data.message);
        } finally{
            setLoading(false);
        }
    }


    return (
        <div className="HTMLcontainer">
            <form method="post" className="LoginForm" onSubmit={handleSubmit}>
                <h2>Create Your Account</h2>
                <div className="form-ele">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter your Name" required value={user.name} onChange={handleInput}/>
                </div>
                <div className="form-ele">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your Email" required value={user.email} onChange={handleInput}/>
                </div>
                <div className="form-ele">
                    <label>Phone No</label>
                    <input type="tel" name="phone" placeholder="Enter your Phone no" required value={user.phone} onChange={handleInput}/>
                </div>
                <div className="form-ele">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your Password" required value={user.password} onChange={handleInput} autoComplete="off"/>
                </div>
                <div className="form-ele">
                <button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
            </div>
            <div className="register-link">
            Already have an account? <NavLink to="/login">Login</NavLink>
            </div>
        </form>
        </div>
    )
}