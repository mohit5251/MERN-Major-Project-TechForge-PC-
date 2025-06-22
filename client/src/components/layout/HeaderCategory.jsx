import { useState } from "react";
import { NavLink } from "react-router-dom";
import { displayCategory } from "../../API/ApiServices";

export const HeaderCategory = () => {
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState([]);

  const handleClick = async () => {
    if (!fetch) {
      try {
        setFetch(true);
        const response = await displayCategory();
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <li className="nav-item dropdown mx-1">
        
      <NavLink className="nav-link dropdown-toggle px-3 py-2 rounded-3" to="#" id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={handleClick}>
        <i className="bi bi-collection me-2"></i>Categories
      </NavLink>

      <ul className="dropdown-menu dropdown-menu-dark bg-primary" aria-labelledby="navbarDropdown"
        style={{ maxHeight: "200px", overflowY: "auto", width: "250px", scrollbarWidth: "thin"}} // Show 5 items (assuming each is ~40px height)
        >

        {
            data?.map((curEle) => (
            <li key={curEle._id}>
                <NavLink className="dropdown-item text-white ms-2" to={`/products/${curEle.subCategory}`}>
    
                {curEle.subCategory}
                </NavLink>
            </li>
            ))
        }
      </ul>
    </li>
  );
};
