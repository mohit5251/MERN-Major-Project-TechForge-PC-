import { useQueries } from "@tanstack/react-query";
import { displayCategory, displayUser, totalProducts } from "../API/ApiServices";
import { Loading } from "../components/layout/Loading";
import { NavLink } from "react-router-dom";
import { OrdersAdmin } from "../components/UI/OrdersAdmin";
import { useState } from "react";

export const AdminContent = () => {

  const[profit, setProfit] = useState(0);

  const results = useQueries({
    queries: [
      {
        queryKey: ["category-admin"],
        queryFn: displayCategory,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["total-products"],
        queryFn: totalProducts,
        staleTime: 1000 * 60 * 5,
      },
      {
        queryKey: ["total-users"],
        queryFn: displayUser,
        staleTime: 1000 * 60 * 5,
      }
    ],
  });

  const [categoryQuery, productQuery, userQuery] = results;

  const isLoading = categoryQuery.isLoading || productQuery.isLoading || userQuery.isLoading;
  if (isLoading) return <Loading />;

  const categoryData = categoryQuery.data?.data || [];
  const totalProductCount = productQuery.data?.data?.total || 0;
  const totalUser = userQuery.data?.data?.userData?.length || 0;
  

  return (
    <div className="admin-dashboard container my-4">
      {/* Cards */}
      <div className="row g-4">
        <div className="col-12 col-sm-6 col-lg-3">

          <NavLink to="/admin/users" style={{color: "black"}}>
            <div className="custom-card shadow-sm p-3 d-flex align-items-center gap-3 rounded">
              <i className="bi bi-people fs-1 text-primary"></i>
              <div>
                  <h6 className="mb-1">{totalUser}</h6>
                  <h5 className="fw-bold">Users</h5>
              </div>
              
            </div>
          </NavLink>

        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <NavLink to="/admin/category" style={{ color: "black" }}>
            <div className="custom-card shadow-sm p-3 d-flex align-items-center gap-3 rounded">
              <i className="bi bi-tags-fill fs-1 text-primary"></i>
              <div> 
                  <h6 className="mb-1">{categoryData.length}</h6>
                  <h5 className="fw-bold">Categories</h5>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <NavLink to="/admin/products" style={{color: "black"}}>
            <div className="custom-card shadow-sm p-3 d-flex align-items-center gap-3 rounded">
              <i className="bi bi-box-seam fs-1 text-primary"></i>
              <div>
                  <h6 className="mb-1">{totalProductCount}</h6>
                  <h5 className="fw-bold">Products</h5>
              </div>
            </div>
          </NavLink>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="custom-card shadow-sm p-3 d-flex align-items-center gap-3 rounded">
            <i className="bi bi-currency-dollar fs-1 text-primary"></i>
            <div>
              <h6 className="mb-1">{profit.toLocaleString("en-IN")}</h6>
              <h5 className="fw-bold">Profit</h5>
            </div>
          </div>
        </div>
      </div>



      {/* Order Table */}
      <OrdersAdmin setProfit={setProfit}/>



    </div>
  );
};
