import { useInfiniteQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { deleteProducts, infiniteProductsAdmin } from "../API/ApiServices";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Loading } from "../components/layout/Loading";
import { useState } from "react";
import { toast } from "react-toastify";

export const ProductsAdmin = () => {

  const[search, setSearch] = useState("");
  const[loading, setLoading] = useState(false);

  //Use infinite Query hook to get Data
  const {data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, isError, error, refetch} = useInfiniteQuery({
    queryKey: ["adminProducts"],
    queryFn: infiniteProductsAdmin,
    getNextPageParam: (lastPage, allPages) => {
      const lastFetched = lastPage?.products;
      
      if(!lastFetched || lastFetched.length < 10) return undefined;

      return allPages.length + 1;
    }
  })

  const{ref, inView} = useInView({threshold:1});

  //On scroll data Logic
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  },[hasNextPage, inView, fetchNextPage]);

  if(isLoading) return <Loading />

  if(isError) return <h1>{error}</h1>


  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  //Searched Data
  const searchedData = data?.pages?.flatMap((page) =>
    page?.products?.filter((curEle) =>
      curEle.name.toLowerCase().includes(search.toLowerCase()) ||
      curEle.brand.toLowerCase().includes(search.toLowerCase())
    )
  );

  //Delete Products
  const handleDelete = async(id) => {
    try {
      setLoading(true);

      const response = await deleteProducts(id);
      if(response.status === 200){
        toast.success(response.data.message);
        refetch();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="page-title">
          <i className="bi bi-box-seam me-2"></i> All Products
        </h1>

        <input type="text" placeholder="Search Products..." className="form-control" name="search" 
            onChange={handleSearch} value={search}
            style={{ flex: 1, maxWidth: "400px", minWidth: "200px" }}
        />

        <NavLink to="/admin/products/add" className="add-category-btn">
          <i className="bi bi-plus-lg me-1"></i> Add Product
        </NavLink>
      </div>

      <div className="category-grid">
        {
          searchedData?.map((curEle) => (

              <div className="category-card" key={curEle?._id}>

                <div className="card-image">
                  <img src={curEle?.image} alt="curEle.name" />
                  <div className="card-badge">{curEle?.brand}</div>
                </div>

                <div className="card-body">
                  <h3 className="card-title">{curEle?.name}</h3>
                  <p className="card-price" style={{ fontWeight: "bold", color: "#4CAF50", margin: "5px 0" }}>
                    ₹{curEle?.price}
                  </p>
                  <p className="card-desc">Short description of the product goes here.</p>

                  <div className="card-actions">
                    <NavLink to={`/admin/products/edit/${curEle?._id}`} className="edit-btn">
                      <i className="bi bi-pencil-square"></i> Edit
                    </NavLink>
                    <button className="delete-btn" onClick={() => handleDelete(curEle?._id)} disabled={loading}>
                      <i className="bi bi-trash"></i> { loading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                  
                </div>

              </div>
          ))
        }
        
      </div>

      <div ref={ref} style={{ padding: "20px", textAlign: "center", color: "black" }}>
        {
          hasNextPage ? "Scroll down to load more" :
          isFetchingNextPage ? "Loading more..." :
          "no more products"
        }
      </div>
    </div>
  );
};
