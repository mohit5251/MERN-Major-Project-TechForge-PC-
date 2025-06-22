/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { verifyLink } from "../API/ApiServices";
import { toast } from "react-toastify";

export const VerificationSuccess = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const token = queryParams.get('token');
    const email = queryParams.get('email');

    const verifyEmail = async() => {
        try {
            const response = await verifyLink(token,email);
            if (response.status === 200) {
                // console.log(response);
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        verifyEmail();
    },[])

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Email Verified Successfully!</h2>
        </div>
        
        <div className="profile-body">
          <div className="verification-success-content">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill h1 text-success"></i>
            </div>
            
            <div className="success-message">
              <h3>Congratulations!</h3>
              <p>Your email address has been successfully verified.</p>
              <p>You now have full access to all features of our platform.</p>
            </div>
            
            <div className="success-actions">
              <NavLink to="/" className="home-btn">
                <i className="bi bi-house-door"></i> Return to Home
              </NavLink>
              
              <NavLink to="/profile" className="profile-btn">
                <i className="bi bi-person"></i> Go to Profile
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};