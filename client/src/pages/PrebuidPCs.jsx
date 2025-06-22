import { useInfiniteQuery } from "@tanstack/react-query";
import { infinitePCs } from "../API/ApiServices";
import { Loading } from "../components/layout/Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


export const PrebuidPCs = () => {

    const[pcSort, setPcSort] = useState("");
    const[search, setSearch] = useState("");

    const navigate = useNavigate();

    //Infinite Query Main
    const {data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["pcsDataAll"],
        queryFn: infinitePCs,

        getNextPageParam: (lastPage, allPages) => {
        const lastFetched = lastPage?.data?.pcs;

        if(!lastFetched || lastFetched.length < 7) return undefined;
        
            return allPages.length + 1;
        },
        retry: false,
    })

    const {ref, inView} = useInView({ threshold:1 })

    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage()
        }
    }, [hasNextPage, inView, fetchNextPage]);

      // 1️⃣ Scroll to top when category changes (separate effect)
      useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth"});
      }, []);


    //flat the Data
    const flatPcsData = data?.pages?.flatMap((pcs) => pcs?.data.pcs.map((curEle) => curEle || []));

    //Search Logic
    const searching = (pc) => {
        if(search) return pc.name.toLowerCase().includes(search.toLowerCase());
        return pc;
    }

    const priceToNumber = (price) => Number(price.replace(/,/g , ''));

    //Sorting and Searching Data 
    const searchedData = flatPcsData
    ?.filter((curELe) => searching(curELe))
    ?.sort((a, b) => {
        if(pcSort=="asc") return priceToNumber(a.price) - priceToNumber(b.price);
        if(pcSort=="dsc") return priceToNumber(b.price) - priceToNumber(a.price);
        return 0;
    })
    
     const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className="all-Prebuild-pcs">

            <div className="productBack-head">
                <button type="button" onClick={handleBack}>
                    <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
                </button>

                <h1 className="title">All Prebuilt PCs</h1>
            </div>  

            {/* Searching and Sorting */}
            <div className="search-sort-pcs">
                <input type="search" className="searchPC" placeholder="Search for PCs" style={{ minWidth: "180px" }} value={search} onChange={(e) => setSearch(e.target.value)}/>

                <select className="sort-PC" style={{ minWidth: "100px" }} onChange={(e) => setPcSort(e.target.value)}>
                    <option value="">- Sort By Price -</option>
                    <option value="asc">low to high</option>
                    <option value="dsc">high to low</option>
                </select>
            </div>


        
            <div className="grid-container">
                {
                    isLoading ? <Loading /> :
                    isError ? <p style={{textAlign : "center"}}>Some Error Occurs</p> :
                    searchedData?.map((pc) => (

                        <div className="pc-card" key={pc._id}>

                            <NavLink to={`/details/${encodeURIComponent(pc?.name)}`}>
                                <img src={pc.image} alt={pc.name} className="pc-image" />
                            </NavLink>

                            <h2 className="pc-name">{pc?.name?.length > 20 ? pc?.name?.slice(0,30) + "..." : ""}</h2>
                            <ul className="pc-specs">
                                <li>{pc.processor}</li>
                                <li>{pc.motherBoard}</li>
                                <li>{pc.ram}</li>
                                <li>{pc.graphicsCard}</li>
                                <li>{pc.ssd}</li>
                            </ul>
                            <p className="pc-price">{pc.price}</p>

                            <NavLink to={`/details/${encodeURIComponent(pc?.name)}`}><button className="configure-btn">CONFIGURE PC</button></NavLink>
                        </div>
                ))}
            </div>

            <div ref={ref} style={{marginTop: "3rem", textAlign: "center", color: "black"}}>
                {
                    isFetchingNextPage ? "Loading more..." :
                    hasNextPage ? "Scroll down to load more" 
                    : "No more PCs"
                }
            </div>
        </div>
    );
};
