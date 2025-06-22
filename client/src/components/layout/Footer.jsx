import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/AuthUser";
import { useEffect } from "react";

export const Footer = () => {

  const {user} = useAuth();


  const[data, setData] = useState({
        email: user?.email,
  });

    // Load email from user only once
    useEffect(() => {
    if (user?.email) {
      setData({ email: user.email });
    } else {
      setData({ email: "" }); // Clear email if user logs out
    }
  }, [user]);

  const handleInput = (e) => {
    const {name,value} = e.target;
    setData((prev) => ({...prev, [name] : value}))
  }



  return (
    <footer className="bg-primary text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <img src="/vite.svg" alt="Logo" width="40" className="me-2" />
              <h5 className="mb-0">TechForge PC</h5>
            </div>
            <p className="text-white-50">
              Building your dream PC since 2023. Quality components, expert advice, and unbeatable prices.
            </p>
            <div className="social-icons mt-3">
              <NavLink to="#" className="text-white me-3"><i className="bi bi-facebook fs-5"></i></NavLink>
              <NavLink to="#" className="text-white me-3"><i className="bi bi-twitter fs-5"></i></NavLink>
              <NavLink to="#" className="text-white me-3"><i className="bi bi-instagram fs-5"></i></NavLink>
              <NavLink to="#" className="text-white"><i className="bi bi-youtube fs-5"></i></NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Home</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Pre-built PCs</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Components</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">About Us</NavLink></li>
              <li><NavLink to="#" className="text-white-50 hover-white">Contact</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">FAQ</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Shipping</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Returns</NavLink></li>
              <li className="mb-2"><NavLink to="#" className="text-white-50 hover-white">Warranty</NavLink></li>
              <li><NavLink to="#" className="text-white-50 hover-white">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">Newsletter</h5>
            <p className="text-white-50">Subscribe for updates and exclusive offers</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control border-0 " placeholder="Your email" aria-label="Email" value={data?.email || ''} onChange={handleInput}/>
              <button className="btn btn-accent text-white" type="button">
                Subscribe
              </button>
            </div>
            <div className="payment-methods mt-3">
              <i className="bi bi-credit-card-2-front fs-4 me-2"></i>
              <i className="bi bi-paypal fs-4 me-2"></i>
              <i className="bi bi-currency-bitcoin fs-4 me-2"></i>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary" />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-white-50">
              &copy; {new Date().getFullYear()} PC Builder Pro. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-white-50">
              Designed with <i className="bi bi-heart-fill text-danger"></i> by your team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};