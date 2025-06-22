/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import { Loading } from "../components/layout/Loading";
import { useAuth } from "../store/AuthUser";
import { Carousel } from "../components/UI/Carousel";
import { CategoryCards } from "../components/UI/CategoryCards";
import { PreBuildPcGrid } from "../components/UI/PreBuildPcGrid";
import { AboutWebSiteServices } from "../components/UI/AboutWebSiteServices";
import { useQuery } from "@tanstack/react-query";
import { displayCategory } from "../API/ApiServices";
import { useEffect } from "react";
import { GraphicsCards } from "../components/UI/GraphicsCards";
// import {toast} from "react-toastify";

export const Home = () => {
  const { refetchAuth, isLoading } = useAuth();

  // Inside your component
    useEffect(() => {
      refetchAuth(); // will run only once when component mounts
    }, []);

    //category display
    const { data, isPending, isError } = useQuery({
      queryKey: ['category'],
      queryFn: displayCategory,
      retry: false,
      staleTime: 1000 * 60 * 5,  // 👈 consider fresh for 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false, 
    });

    
    const categoryList = Array.isArray(data?.data) ? data.data : [];
    
    //Filtering data Component Category
    const componentData = categoryList?.filter((ele) =>
          ele?.categoryName?.toLowerCase().includes("component".toLowerCase())
    ) || [];
    //Filtering data Accessory Category
    const AccessoryData = categoryList?.filter((ele) =>
          ele?.categoryName?.toLowerCase().includes("accessory".toLowerCase())
    ) || [];

    if(isLoading) return <Loading />
  
  return (
    <>

      {/*Section 1.  Carousel */}
      <div className="carousel-animation">
        <Carousel/>
      </div>


      {/*Section 2.  BANNER FOR PRE BUILD PCs  */}
      <div className="banner-animation mt-4 m-3">
        <img src="https://res.cloudinary.com/dokpeunu6/image/upload/v1750606397/Predbuild_banner_gy46p8.webp" alt="" className="d-block w-100 h-100 object-fit-contain"/>
      </div>


       {/* Graphics CARDS Section */}
        <h2 className="fw-bolder mt-5" style={{textAlign: "center"}}>RTX 50 Series Graphics Card</h2>
        <GraphicsCards />

        
      {/* PC Grid with animation */}
       {/* CARDS FOR PRE BUILD PCs  */}
        <PreBuildPcGrid />
      

      {/*Section 3.  Horizontal Card Scroller Section FOR CATEGORIES*/}

      <div className="categoryHome-wrapper mt-5">
        <h1 className="categoryHome-title">SHOP BY CATEGORY</h1>

        <h3 className="categoryHome-subtitle">CORE COMPONENTS</h3>
        <div className="categoryHome-scroller">
          {
            isPending ? <Loading /> :
            isError ? <p>Error occurs</p> :
            componentData?.map((cat, index) => (
              <CategoryCards key={index} data={cat} />
            ))
          }
          <p className="m-0 p-0 text-center text-danger">{data?.data?.message}</p>
        </div>

        <h3 className="categoryHome-subtitle">Addon Peripherals & Accessories</h3>
        <div className="categoryHome-scroller">
          {
            isPending ? <Loading /> :
            isError ? <p>Error occurs</p> :
            AccessoryData?.map((cat, index) => (
              <CategoryCards key={index} data={cat} />
            ))
          }
          <p className="m-0 p-0 text-center text-danger">{data?.data?.message}</p>
        </div>
      </div>



      {/*Section 4. ABOUT WEBSITE CONETNT */}
      <AboutWebSiteServices />


    </>
  );
};
       