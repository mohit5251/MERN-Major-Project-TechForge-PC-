import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { displayCategory, insertProduct } from "../API/ApiServices"; // Your actual API call
import { Loading } from "../components/layout/Loading";

export const InsertProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [cateLoading, setCateLoading] = useState(true);
  const[cateData, setCateData] = useState([]);

  const [data, setData] = useState({
    name: "",
    subCategory: "",
    brand: "",
    price: "",
    stock: "",
    specifications: "",
    image: null,
  });

  //get Category data here
  useEffect(() => {
    const categoryData = async() => {
        const response = await displayCategory();
        if(response.status === 200){
            setCateData(response.data);
            setCateLoading(false);
        }
    }
    categoryData();
  },[])

  if(cateLoading) return <Loading />
  

  const handleInput = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await insertProduct(data); // Make sure this is configured for multipart/form-data
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.extraDetails ? error?.response?.data?.extraDetails : error?.response?.data?.message );
    } finally {
      setLoading(false);
    }
    
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Product</h2>
      <form className="category-form" method="post" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Product Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter product name"
            value={data.name}
            onChange={handleInput}
            required
          />
        </div>

        {/* Sub Category */}
        <div className="form-group">
          <label htmlFor="subCategory" className="form-label">
            Sub Category <span className="required">*</span>
          </label>
            <select name="subCategory"className="form-input responsive-select" value={data.subCategory} onChange={handleInput} required >
                <option value="">-- Select Category --</option>
                {
                    cateData.map((curEle) => (
                        <option value={curEle.subCategory} key={curEle._id}>{curEle.subCategory}</option>
                ))
                }
            </select>
        </div>


        {/* Brand */}
        <div className="form-group">
          <label htmlFor="brand" className="form-label">
            Brand <span className="required">*</span>
          </label>
          <input
            type="text"
            name="brand"
            className="form-input"
            placeholder="Enter brand"
            value={data.brand}
            onChange={handleInput}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price <span className="required">*</span>
          </label>
          <input
            type="text"
            name="price"
            className="form-input"
            placeholder="Enter price"
            value={data.price}
            onChange={handleInput}
            required
          />
        </div>

        {/* Stock */}
        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            Stock <span className="required">*</span>
          </label>
          <input
            type="text"
            name="stock"
            className="form-input"
            placeholder="Enter stock count"
            value={data.stock}
            onChange={handleInput}
            required
          />
        </div>

        {/* Specifications */}
        <div className="form-group">
          <label htmlFor="specifications" className="form-label">
            Specifications (JSON format) <span className="required">*</span>
          </label>
          <textarea
            name="specifications"
            className="form-textarea"
            rows="5"
            placeholder={`Example: {"RAM": "16GB", "Processor": "Intel i7"}`}
            value={data.specifications}
            onChange={handleInput}
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Product Image <span className="required">*</span>
          </label>
          <div className="image-upload-container">
            <label htmlFor="image" className="form-input">
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={handleInput}
              />
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
};
