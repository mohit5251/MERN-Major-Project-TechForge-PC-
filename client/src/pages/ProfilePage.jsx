/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ErrorPage } from "../components/layout/ErrorPage";
import { Loading } from "../components/layout/Loading";
import { useAuth } from "../store/AuthUser";
import { NavLink, useNavigate } from "react-router-dom";

export const Profile = () => {

  const navigate = useNavigate();

  const { user, refetchAuth, isLoading } = useAuth();

  useEffect(() => {
    refetchAuth(); // ✅ run only once on mount
  }, []);

  if(isLoading){
    return <Loading />
  }

  if(!user) return <ErrorPage/>
  

  return (
    <>
      <div className="mb-3 ps-5" style={{display: "flex", alignItems: "center"}}>

              <button className="me-4 mb-1" type="button" style={{ border: "none" }} onClick={() => navigate(-1)}>
                  <i className="bi bi-arrow-left-square-fill fs-2 text-primary"></i>
              </button>

              {/* <h3>Shipping Address</h3> */}
      </div>
      <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        
        <div className="profile-body">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <div className="info-content">
                <span className="info-label">Name:</span>
                <span className="info-value" style={{marginLeft: "-0.4rem"}}>{user?.name}</span>
              </div>
              <NavLink to={`/change-name/${user?.userId}`}>
                <button className="profile-btn">
                  Change Name
                </button>
              </NavLink>
            </div>

            <div className="info-item">
              <div className="info-content">
                <span className="info-label">Email:</span>
                <span className="info-value" >{user?.email}</span>
                <span className={`verification-badge ${user?.isEmailValid ? 'verified' : 'not-verified'}`}>
                  {user?.isEmailValid ? 'Email Verified' : 'Email Not Verified'}
                </span>
              </div>
              { !user?.isEmailValid && (
                <NavLink to="/verify-email">
                  <button className="profile-btn verify-btn">Verify Email</button>
                </NavLink>
              )}
              <button className="profile-btn">
                Change Email
              </button>
            </div>

            <div className="info-item">
              <div className="info-content">
                <span className="info-label">Password:</span>
                <span className="info-value">••••••••</span>
              </div>
              <NavLink to="/forgot-password">
                <button className="profile-btn" style={{marginLeft: "-0.3rem"}}>Change Password</button>
              </NavLink>
            </div>
          </div>

          <NavLink to="/" className="home-btn">
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
    </>
    
  );
};