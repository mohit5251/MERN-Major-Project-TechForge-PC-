import { useInfiniteQuery } from "@tanstack/react-query"
import { deletePc, infinitePCs } from "../API/ApiServices"
import { useState } from "react"
import { NavLink } from "react-router-dom";
import { Loading } from "../components/layout/Loading";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

export const PreBuildPcsAdmin  = () => {

    const[search, setSearch] = useState("");
    const[loading, setLoading] = useState(false);
    
    
    const {data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, refetch} = useInfiniteQuery({
        queryKey: ['PcsDataAdmin'],
        queryFn: infinitePCs,
        getNextPageParam: ((lastPage, allPages) => {
            const lastFetched = lastPage?.data?.pcs;

            if(!lastFetched || lastFetched.length <7) return undefined;

            return allPages.length + 1;
        })
    })

    // Flat all Data
    const flatPcsData = data?.pages?.flatMap((Pcs) => Pcs?.data?.pcs?.map((curEle) => curEle || []));
    
    // Searched Data
    const searchedData = flatPcsData?.filter((curEle) => {
        return curEle.name.toLowerCase().includes(search.toLowerCase())
    });

    const {ref, inView} = useInView({ threshold :1 });
    
    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage();
        }
    },[hasNextPage, inView, fetchNextPage]);


    const handleDelete = async(id) => {
        try {
            setLoading(true);
            const response = await deletePc(id);
            if(response.status === 200){
                toast.success(response.data.message);
                refetch();
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error Deleting Pc Data");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="category-page">
            <div className="category-header">
                <h1 className="page-title">
                <i className="bi   bi-box-seam me-2"></i> All Products
                </h1>

                <input type="text" placeholder="Search Products..." className="form-control" name="search" autoComplete="off"
                    onChange={(e) => setSearch(e.target.value)} value={search}
                    style={{ flex: 1, maxWidth: "400px", minWidth: "200px" }}
                />

                <NavLink to="/admin/pcs/add" className="add-category-btn">
                    <i className="bi bi-plus-lg me-1"></i> Add Product
                </NavLink>
            </div>

            <div className="category-grid">
                {
                    isLoading ? <Loading />
                    : isError ? <p>Some error occurs</p> 
                    : searchedData?.map((curEle) => (
                        <div className="category-card" key={curEle?._id}>
                            <div className="card-image">
                            <img src={curEle?.image} alt="curEle.name" />
                            {/* <div className="card-badge">{curEle?.processor}</div> */}
                            </div>
                            <div className="card-body">
                            {/* <p className="card-price" style={{ fontWeight: "bold", margin: "5px 0" }}>
                                {curEle?.name}
                            </p> */}
                            <p className="card-price"> {curEle?.name}</p>
                            <h3 className="card-title">₹{curEle?.price}</h3>
                            <p className="card-desc">a short description goes here</p>
                            
                            <div className="card-actions">
                                <NavLink to={`/admin/pcs/edit/${curEle?._id}`} className="edit-btn">
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
                "no more Pcs"
                }
            </div>
            </div>
    )
}