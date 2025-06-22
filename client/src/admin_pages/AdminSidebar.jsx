import { NavLink, useNavigate } from "react-router-dom";

export const AdminSidebar = () => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 container mt-3">
        <div className="d-flex gap-2">
          {/* Menu Button */}
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#customSidebar"
            aria-controls="customSidebar"
          >
            ☰
          </button>

          {/* Back Button */}
          <button className="btn btn-primary" type="button" onClick={handleBack}>
            <i className="bi bi-arrow-left-square-fill  h5"></i>
          </button>
        </div>

        
          {/* Center Heading */}
          <h4 className="text-center flex-grow-1 m-0" style={{ fontWeight: "bold" }}>
            Admin Dashboard
          </h4>

        {/* Home Button (Right aligned) */}
        <NavLink to="/">
          <button className="btn btn-primary" type="button">
            <i className="bi bi-house-door h5"></i>
          </button>
        </NavLink>
      </div>


      {/* Offcanvas Sidebar */}
      <div
        className="offcanvas offcanvas-start custom-offcanvas"
        tabIndex="-1"
        id="customSidebar"
        aria-labelledby="customSidebarLabel"
        data-bs-scroll="true"
        data-bs-backdrop="true"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title text-white" id="customSidebarLabel">
            Admin Panel
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          <NavLink to="/admin" className="nav-link">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="nav-link">
            <i className="bi bi-people me-2"></i> Users
          </NavLink>
          <NavLink to="/admin/category" className="nav-link">
            <i className="bi bi-tags me-2"></i> Categories
          </NavLink>
          <NavLink to="/admin/products" className="nav-link">
            <i className="bi bi-box-seam me-2"></i> Products
          </NavLink>
          <NavLink to="/admin/pcs" className="nav-link">
            <i className="bi bi-pc-display me-2"></i> PreBuild PCs
          </NavLink>
          <NavLink to="#" className="nav-link">
            <i className="bi bi-envelope me-2"></i> Contacts
          </NavLink>
        </div>
      </div>
    </>
  );
};
