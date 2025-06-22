import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleCategory, updateCategory} from "../API/ApiServices";
import { toast } from "react-toastify";
import { Loading } from "../components/layout/Loading";

export const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    categoryName: "",
    subCategory: "",
    categoryDesc: "",
    image: "",
  });

  //for disabling Button
  const [loading, setLoading] = useState(false);

  //for single data loading
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch existing category data on load
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getSingleCategory(id);
        if (response.status === 200) {
          setData({
            categoryName: response.data.category.categoryName,
            subCategory: response.data.category.subCategory,
            categoryDesc: response.data.category.categoryDesc,
            image: "",
          });
          setDataLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch category details");
        setDataLoading(false);
      }finally{
        setDataLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if(dataLoading) return <Loading />
  


  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };


  
  //handling update on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateCategory(id, data);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/admin/category");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Update Category</h2>
      <form className="category-form" method="post" onSubmit={handleSubmit}>

        {/* Category Name */}
        <div className="form-group">
          <label htmlFor="categoryName" className="form-label">
            Category Name <span className="required">*</span>
          </label>
          <select name="categoryName" className="form-input" value={data.categoryName} onChange={handleInput} required>
            <option value="">-- Select Category --</option>
            <option value="component">component</option>
            <option value="accessory">accessory</option>
          </select>
        </div>

        {/* Sub Category */}
        <div className="form-group">
          <label htmlFor="subCategory" className="form-label">
            Sub Category
          </label>
          <input
            type="text"
            name="subCategory"
            className="form-input"
            placeholder="Enter sub category"
            value={data.subCategory}
            onChange={handleInput}
            required
          />
        </div>

        {/* Category Description */}
        <div className="form-group">
          <label htmlFor="categoryDesc" className="form-label">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="categoryDesc"
            name="categoryDesc"
            className="form-textarea"
            placeholder="Enter category description"
            rows="5"
            required
            value={data.categoryDesc}
            onChange={handleInput}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Category Image (optional)
          </label>
          <div className="image-upload-container">
            <label htmlFor="image" className="form-input">
              <input type="file" name="image" accept="image/*" onChange={handleInput} />
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </button>
        </div>
      </form>
    </div>
  );
};
