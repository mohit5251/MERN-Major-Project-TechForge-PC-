import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../API/ApiServices";
import { useAuth } from "../../store/AuthUser";
import { toast } from "react-toastify";
import { HeaderCategory } from "./HeaderCategory";
import { GlobalSearchBar } from "../GlobalSearchBar";

export const Header = () => {
    const { refetchAuth, user } = useAuth();
    const navigate = useNavigate();

    const {cartData, cartLoading} = useAuth();

    if(cartLoading){
        return "...";
    }

    const cartLength = cartData?.data?.cart?.items.length || 0;
    
    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            if (response.status === 200) {
                toast.success(response.data.message);
                await refetchAuth();
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // if(isLoading) return <p>loading...</p>;

    return (
        <nav className="navbar navbar-expand-xl navbar-dark mb-2 py-3 sticky-top" style={{backgroundColor: "#4f46e5"}}>
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <img src="/vite.svg" alt="..."/>
                    TechForge PC
                </NavLink>
                
                {/* Mobile Toggle Button */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent" 
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-1">
                            <NavLink 
                                className="nav-link px-3 py-2 rounded-3" 
                                activeclassname="active bg-primary-dark"
                                to="/"
                            >
                                <i className="bi bi-house-door me-2"></i>Home
                            </NavLink>
                        </li>
                        
                        {!user && (
                            <>
                                <li className="nav-item mx-1">
                                    <NavLink 
                                        className="nav-link px-3 py-2 rounded-3" 
                                        activeclassname="active bg-primary-dark"
                                        to="/register"
                                    >
                                        <i className="bi bi-person-plus me-2"></i>Register
                                    </NavLink>
                                </li>
                                <li className="nav-item mx-1">
                                    <NavLink 
                                        className="nav-link px-3 py-2 rounded-3" 
                                        activeclassname="active bg-primary-dark"
                                        to="/login"
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                    </NavLink>
                                </li>
                            </>
                        )}

                        <HeaderCategory />

                        {user && (
                            <>
                            
                            {/* Account DropDown */}
                            <li className="nav-item dropdown mx-1">
        
                                <NavLink className="nav-link dropdown-toggle px-3 py-2 rounded-3" to="#" id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person me-2"></i>Account
                                </NavLink>

                                <ul className="dropdown-menu dropdown-menu-dark bg-primary" aria-labelledby="navbarDropdown"
                                style={{ maxHeight: "200px", overflowY: "auto", width: "250px", scrollbarWidth: "thin"}} // Show 5 items (assuming each is ~40px height)
                                >
                                    <li >
                                        <NavLink className="dropdown-item text-white ms-2" to="/profile">
                                            <i className="bi bi-person me-3"></i>Profile
                                        </NavLink>
                                         <NavLink className="dropdown-item text-white ms-2" to="/orders">
                                            <i className="bi bi-cart fs-5 me-3"></i>Order
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            
                            {/* <li className="nav-item mx-1">
                                <NavLink className="nav-link px-3 py-2 rounded-3" to="/profile" >
                                    <i className="bi bi-person me-2"></i>Account
                                </NavLink>
                            </li> */}

                            <li className="nav-item mx-1">
                                <NavLink className="nav-link px-3 py-2 rounded-3" to="#" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-left me-2"></i>Logout
                                </NavLink>
                            </li>
                            {user.isAdmin && (
                                <li className="nav-item mx-1">
                                <NavLink className="nav-link px-3 py-2 rounded-3" to="/admin">
                                    <i className="bi bi-menu-button-wide-fill me-2"></i>AdminPanel
                                </NavLink>
                                </li>
                            )}
                            </>                        
                        )}
                        
                    </ul>

                   
                   <div className="d-flex align-items-center ms-auto" style={{ flex: 1, gap: "1rem", minWidth: 0 }}>
                    {/* Search Bar: Flex-grow to take remaining space */}
                    <div className="flex-grow-1" style={{ minWidth: 0}}>
                        <GlobalSearchBar />
                    </div>

                    {/* Cart Icon */}
                    <button className="btn btn-light position-relative flex-shrink-0" 
                        onClick={() => {
                            if (!user) {
                                toast.warn("Please login first!");
                                navigate("/login");
                            } else {
                                navigate("/cart");
                            }
                        }}
                    >
                        <i className="bi bi-cart fs-5"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartLength}
                        </span>
                    </button>

                </div>


                </div>
            </div>
        </nav>
    )
}