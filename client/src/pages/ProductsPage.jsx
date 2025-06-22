import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import { infiniteProducts } from "../API/ApiServices";
import { useInView } from "react-intersection-observer";
import { Loading } from "../components/layout/Loading";
import { ProductsCard } from "../components/UI/ProductsCards";

export const ProductsPage = () => {

  const { category } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');

  const [wishlist, setWishlist] = useState({}); // Stores wishlist state by product ID
  const [brand, setBrand] = useState('all');   //filter by brand
  const [sortOrder, setSortOrder] = useState("");


  //USING INFINITE SCROLL FOR FETCHING
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ["products", category],
    queryFn: ({ pageParam = 1 }) => infiniteProducts(pageParam, category),
  
    getNextPageParam: (lastPage, allPages) => {
        const lastFetched = lastPage.products
            
        if(!lastFetched || lastFetched.length < 10) return undefined;

        return allPages.length + 1;
    }

  });

  const {ref, inView} = useInView({threshold: 1});

  useEffect(() => {
    
      fetchNextPage();
    
  },[hasNextPage, inView, fetchNextPage]);


  // 1️⃣ Scroll to top when category changes (separate effect)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth"});
  }, [category]);
  

  // WISHLIST logic
  const toggleWishlist = (product) => {
    setWishlist((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));
  };

  const navigate = useNavigate();

  //handle back btn
  const handleBack = () => {
    navigate(-1);
  }

  // Extract unique brands from all pages
  const uniqueBrand = Array.from(
    new Set(
      data?.pages?.flatMap((page) =>
        page?.products?.map((curEle) => curEle.brand)
      )
    )
  );


  //Getting all Product data
      const productAll = data?.pages?.flatMap((page) => page?.products || []);
  

  // Query paramteter Data
   const specificData = (curProduct) => {
    if(name == null || name == "") return curProduct;
    return curProduct?.name.toLowerCase().includes(name.toLocaleLowerCase());
  }

  // Filter by brand
  const filteredData = (curProduct) => {
    if (brand === "all" || brand === "") return curProduct;
    return curProduct?.brand.toLowerCase().includes(brand.toLowerCase());
  }

  //removing " , " from price for sorting
  const priceToNumber = (price) => Number(price.replace(/,/g, ''));

  // Main search Data
  const searchedData = productAll
    ?.filter((curProduct) => specificData(curProduct) && filteredData(curProduct)) 
    ?.sort((a,b) => {
      if (sortOrder === "asc") return priceToNumber(a.price) - priceToNumber(b.price);
      if (sortOrder === "dsc") return priceToNumber(b.price) - priceToNumber(a.price);
      return 0;
    })


  if(isLoading) return <Loading />

  if(isError || error) return <h1>Error Occurs: {error}</h1>

  return (
    <div className="container products-minimal">

      <div className="productBack-head">
        
        <button type="button" onClick={handleBack}>
          <i className="bi bi-arrow-left-square-fill fs-3 text-primary"></i>
        </button>

        <h1>{category}</h1>
      </div>

        <div className="filter-sort-row">

          <div className="brand-filter">
            <select className="form-select" style={{ minWidth: "180px" }} value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">- Filter By Brand -</option>
              {
                  uniqueBrand?.map((brand, index) => (
                    <option value={brand} key={index}>{brand}</option>
                  ))
              }
            </select>
          </div>

          <div className="sort-filter">
            <select className="form-select" style={{ minWidth: "180px" }} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">- Sort By Price -</option>
                <option value="asc">low to high</option>
                <option value="dsc">high to low</option>
            </select>
          </div>
        </div>

      
      {/* Products Card Part */}
      <div className="product-grid-minimal">
        {
            searchedData?.map((curEle) => (

                    <div key={curEle._id} className="product-card-minimal">

                      <ProductsCard  data={curEle} wishlist={wishlist} toggleWishlist={toggleWishlist} />

                    </div>
                ))
            }
            </div>


            {/* Error or not not found Part */}
            {searchedData?.length === 0 && (
              <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
                No products found for selected name and brand.
              </p>
            )}

            <div ref={ref} style={{padding: "20px", textAlign: "center", color: "black"}}>
                {
                    isFetchingNextPage ? "Loading more..." :
                    hasNextPage ? "Scroll down to load more" 
                    : "No more Products"
                }
            </div>
    </div>
  );
};
