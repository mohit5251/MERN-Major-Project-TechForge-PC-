import { useState } from "react"
import { loginUser } from "../API/ApiServices";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthUser";

export const Login = () => {

    const [user, setUser] = useState({
        email : "",
        password: "",
    });
    const [isLoading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {refetchAuth} = useAuth();

    const handleInput = (e) => {
        const{name, value} = e.target;
        setUser((prev) => ({...prev,[name] : value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await loginUser(user);

            if(response.status === 200){
                toast.success(response.data.message);
                await refetchAuth();
                navigate("/");
                setLoading(false);
            }
        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.extraDetails? error.response.data.extraDetails : error.response.data.message);
        } finally {
            setLoading(false); 
        }
        
    }
    

    return (
        <div className="HTMLcontainer container">
            <form method="post" className="LoginForm" onSubmit={handleSubmit}>
                <h2>Login to Your Account</h2>
                <div className="form-ele">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your Email" required value={user.email} onChange={handleInput}/>
                </div>
                <div className="form-ele">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your Password" required value={user.password} onChange={handleInput} autoComplete="off"/>
                </div>
                <div className="form-footer">
                    <div className="remember-me">
                        <input type="checkbox" id="remember"/>
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <NavLink to="/forgot-password" className="forgot-password" >Forgot password?</NavLink>
                </div>
                <div className="form-ele">
                    <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
                </div>
                <div className="register-link">Don't have an account? <NavLink to="/register">Sign up</NavLink> </div>
            </form>
        </div>
    )
}