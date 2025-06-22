import { useEffect } from "react";
import { useState } from "react"
import { searchData } from "../API/ApiServices";
import { useNavigate } from "react-router-dom";

export const GlobalSearchBar = () => {

    const[query, setQuery] = useState("");
    const[data, setData] = useState([]);
    const[showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const delayBounce = setTimeout(() => {
            const fetchSearchData = async() => {

            if(query.trim() === ""){
                setData([]);
                return;
            }

            try {
                const response = await searchData(query);
                if(response.status === 200){
                    setData(response?.data?.result);
                    setShowDropdown(true);
                }else{
                    setData([]);
                    setShowDropdown(false);
                }
            } catch (error) {
                console.log(error);
                setShowDropdown(false);
            }
        }
        
            fetchSearchData();
        }, 400);
        
        return () => clearTimeout(delayBounce)
    },[query]);
    

    const handleSelect = (name) =>{
        setQuery("");
        setShowDropdown(false);
        navigate(`/details/${encodeURIComponent(name)}`);
    }

    

    return (
        
        <div className="position-relative w-100" >
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <input 
                        className="form-control border-0" 
                        type="search" 
                        placeholder="Search..." 
                        aria-label="Search" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}

                    />
                        <button className="btn btn-light" type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                </div>
            </form>

            {
                showDropdown && query.trim() !== "" && (

                    <ul className="list-group position-absolute w-100 z-3 mt-1" style={{ maxHeight: "250px", overflowY: "auto" }}>
                        {
                            data.length === 0
                            ? <li className="list-group-item text-muted">No Product found</li>
                            : data.map((curProd) => (

                                <div key={curProd._id} className="list-group-item list-group-item-action d-flex align-items-center" style={{ backgroundColor: "white", cursor: "pointer" }} onClick={() => handleSelect(curProd.name)}>
                                    <img src={curProd.image} height="50" width="50" className="me-2" />
                                    <span>{curProd.name}</span>
                                </div>

                            ))
                        }
                    </ul>
                )
            }

        </div>
        
    )
}