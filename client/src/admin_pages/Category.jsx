/* eslint-disable react-hooks/exhaustive-deps */
import { useInfiniteQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { deleteCategory, infiniteCategoryData } from "../API/ApiServices";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loading } from "../components/layout/Loading";

export const Category = () => {

    const[loading, setLoading] = useState(false);

    //Infinite scroll data logic
    const {data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery({
        queryKey: ["infiCategory"],
        queryFn: infiniteCategoryData,
        retry: false,
        staleTime: 5000,  //fresh for 5 min
        
        getNextPageParam: (lastPage, allPages) => {
            const lastFetched = lastPage.category
            
            if(!lastFetched || lastFetched.length < 10) return undefined;

            return allPages.length + 1;
        }
    })
    
    const {ref, inView} = useInView({ threshold: 1 })

    //Delete data logic
    const handleSubmit = async (id) => {
        try {
            setLoading(true);
        
            const response = await deleteCategory(id);
            if(response.status === 200){
                toast.success(response.data.message);
                refetch();
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage();
        }
    },[hasNextPage, inView])

    if (isLoading) return <Loading />;
    



  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="page-title">
          <i className="bi bi-tags me-2"></i> Product Categories
        </h1>
        <NavLink to="/admin/category/add" className="add-category-btn">
          <i className="bi bi-plus-lg me-1"></i> Add Category
        </NavLink>
      </div>

        <div className="category-grid">
            {
            data?.pages?.map((page) =>
            page?.category?.map((category) => (
                <div key={category._id} className="category-card">
                <div className="card-image">
                    <img src={category.image} alt={category.subCategory} />
                    <div className="card-badge">{category.categoryName}</div>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{category.subCategory}</h3>
                    <p className="card-desc">{category.categoryDesc}</p>
                    <div className="card-actions">
                    <NavLink 
                        to={`/admin/category/edit/${category._id}`} 
                        className="edit-btn"
                    >
                        <i className="bi bi-pencil-square"></i> Edit
                    </NavLink>
                    <button className="delete-btn" onClick={() => handleSubmit(category._id)} disabled={loading}>
                        <i className="bi bi-trash"></i> Delete
                    </button>
                    </div>
                </div>
                </div>
            ))
            )
            }
        </div>
        <div ref={ref} style={{padding: "20px", textAlign: "center", color: "black"}}>
                {isFetchingNextPage ? "Loading more..."
                    : hasNextPage ? "Scroll down to load more"
                    : "No more Category"
                }
        </div>

    </div>
  );
};