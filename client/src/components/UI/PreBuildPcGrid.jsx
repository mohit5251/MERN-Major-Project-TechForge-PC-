import { useInfiniteQuery } from "@tanstack/react-query";
import { infinitePCs } from "../../API/ApiServices";
import { Loading } from "../layout/Loading";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { NavLink } from "react-router-dom";

// const pcBuilds = [
//   {
//     title: "GAMING & STREAMING PC",
//     description: "High-performance system built for seamless gaming and streaming.",
//     image: "Gaming&Streaming_PC.webp",
//   },
//   {
//     title: "3D MODELLING PC",
//     description: "Experience unrivaled performance for complex 3D modelling and rendering.",
//     image: "/images/3d-modelling-pc.webp",
//   },
//   {
//     title: "ARCHITECTURAL PC",
//     description: "Optimized for architectural design, visualization, and complex CAD workflows.",
//     image: "/images/architectural-pc.webp",
//   },
//   {
//     title: "GRAPHIC DESIGNING PC",
//     description: "Unleash your creativity with a PC specifically tailored for design work.",
//     image: "/images/graphic-design-pc.webp",
//   },
//   {
//     title: "VIDEO EDITING PC",
//     description: "Streamlined for high-res video editing and fast rendering speeds.",
//     image: "/images/video-editing-pc.webp",
//   },
//   {
//     title: "VFX ANIMATION PC",
//     description: "Built to handle complex visual effects and animation tasks with ease.",
//     image: "/images/vfx-animation-pc.webp",
//   },
//   {
//     title: "GAMING & STREAMING PC",
//     description: "High-performance system built for seamless gaming and streaming.",
//     image: "Gaming&Streaming_PC.webp",
//   },
//   {
//     title: "3D MODELLING PC",
//     description: "Experience unrivaled performance for complex 3D modelling and rendering.",
//     image: "/images/3d-modelling-pc.webp",
//   },
//   {
//     title: "ARCHITECTURAL PC",
//     description: "Optimized for architectural design, visualization, and complex CAD workflows.",
//     image: "/images/architectural-pc.webp",
//   },
//   {
//     title: "GRAPHIC DESIGNING PC",
//     description: "Unleash your creativity with a PC specifically tailored for design work.",
//     image: "/images/graphic-design-pc.webp",
//   },
//   {
//     title: "VIDEO EDITING PC",
//     description: "Streamlined for high-res video editing and fast rendering speeds.",
//     image: "/images/video-editing-pc.webp",
//   },
//   {
//     title: "VFX ANIMATION PC",
//     description: "Built to handle complex visual effects and animation tasks with ease.",
//     image: "/images/vfx-animation-pc.webp",
//   },
// ];

export const PreBuildPcGrid = () => {

  const scrollContainerRef = useRef();
  const [observerRoot, setObserverRoot] = useState(null);

  useEffect(() => {
    setObserverRoot(scrollContainerRef.current);
  }, []);

  const { ref: loaderRef, inView } = useInView({
    root: observerRoot,
    threshold: 1,
  });


  const {data, isLoading, isError, hasNextPage , fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['PCsData'],
    queryFn: infinitePCs,

    getNextPageParam: (lastPage, allPages) => {
      const lastFetched = lastPage?.data?.pcs;

      if(!lastFetched || lastFetched.length < 7) return undefined;
      
      return allPages.length + 1;
    },
    retry: false,
  });


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);


  const flatPcsData = data?.pages?.flatMap((pcs) => pcs?.data.pcs.map((curEle) => curEle || []));

  

  return (
    <div className="prebuilt-pc-section">
      
      <div className="prebuilt-header">
        <h2 className="prebuilt-title">FEATURED PC BUILD</h2>
        <button className="prebuilt-viewall">
          <NavLink to="/prebuild-pcs"><i className="bi bi-arrow-right-circle"></i></NavLink>
        </button>
      </div>

      <div className="prebuilt-horizontal-scroll" ref={scrollContainerRef}>
        {
          isLoading ? <Loading /> :
          isError ? <p>Some Error Occurs</p> :
          flatPcsData?.map((pc) => (
            <div className="prebuilt-card" key={pc?._id}>

              <div className="prebuilt-image">
                <NavLink to={`/details/${encodeURIComponent(pc?.name)}`}><img src={pc.image} alt={pc.name} /></NavLink>
              </div>

              <div className="prebuilt-info">
                <h3>Rs. {pc?.price}</h3>
                <p>{pc?.name}</p>
                <button className="prebuilt-btn">BUY NOW</button>
              </div>
              
            </div>
          ))
        }
      </div>
      <div ref={loaderRef} className="loaderPCS-placeholder">
        {isFetchingNextPage ? "Loading More..." : hasNextPage ? "Scroll to load more" : ""}
      </div>
    </div>
  );
};
