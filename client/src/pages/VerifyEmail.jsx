import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthUser"
import { useEffect, useState } from "react";
import { sendVerificationLink } from "../API/ApiServices";
import { toast } from "react-toastify";
import { ErrorPage } from "../components/layout/ErrorPage";
import { Loading } from "../components/layout/Loading";

export const VerifyEmail = () => {

    const {user, isLoading} = useAuth();
    const[loading, setLoading] = useState(true);

    // const navigate = useNavigate();

    const sendLink = async () => {
        setLoading(true); // disable button
        try {
            const response = await sendVerificationLink();
            if (response.status === 200) {
                console.log(response);
                toast.success(response.data.message);
                // toast.info("You will get Navigated to Home Page After 30 Seconds")
                // setTimeout(() => {
                //   navigate("/");
                // },30000)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false); // re-enable button after success or error
        }
    };

    useEffect(() => {
        sendLink();
    }, []);

    const handleSubmit = () => {
        sendLink();
    };

    if (isLoading || !user) return <Loading />;
    if(!user) return <ErrorPage />
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                <h2>Email Verification</h2>
            </div>
        
            <div className="profile-body">
                <div className="verification-content">
                    <div className="verification-icon">
                    <i className="bi bi-envelope-check h1 text-primary"></i>
            </div>
            
            <div className="verification-instructions">
              <h3>Verify Your Email Address</h3>
              <p>
                We've sent a verification link to <strong>{user?.email}</strong>.
                Please click the link in the email to verify your account.
              </p>
              
              <div className="verification-tips">
                <p><i className="bi bi-check-circle"></i> Check your inbox for our email</p>
                <p><i className="bi bi-exclamation-triangle"></i> Can't find it? Check your spam folder</p>
                <p><i className="bi bi-clock"></i> The link will expire in 24 hours</p>
              </div>
            </div>
            
            <div className="verification-actions">
              <button className="home-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Sending..." : "Resend Verification Email"}
              </button>
              
              <NavLink to="/profile" className="profile-btn">
                Back to Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}