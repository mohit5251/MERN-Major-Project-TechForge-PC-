import { useNavigate } from "react-router-dom";
import { Loading } from "../layout/Loading";

export const CategoryCards = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${data?.subCategory}`);
  };

  if (!data) return <Loading />;

  return (
    <div className="categoryCardHome" onClick={handleClick}>
      <img src={data?.image} className="categoryCardHome-img" alt="category" />
      <div className="categoryCardHome-body">
        <h5 className="fs-6">{data?.subCategory}</h5>
      </div>
    </div>
  );
};
