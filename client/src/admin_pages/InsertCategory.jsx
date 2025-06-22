import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { categoryInsertion } from "../API/ApiServices";
import { toast } from "react-toastify";

export const InsertCategory = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        categoryName : "",
        subCategory: "",
        categoryDesc: "",
        image: "",
    })

    const[loading, setLoading] = useState(false);

    const handleInput = (e) => {
        const {name, value, files } = e.target;

        if (name === "image") {
            setData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await categoryInsertion(data);
            if(response.status === 200){
                console.log(response);
                toast.success(response.data.message);
                navigate("/admin/category")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally{
            setLoading(false);
        }
        
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <div className="form-container">
      <h2 className="form-title">Add New Category</h2>
      <form className="category-form" method="post" onSubmit={handleSubmit}>

        {/* Category Name */}
        <div className="form-group">
          <label htmlFor="categoryName" className="form-label">
            Category Name <span className="required">*</span>
          </label>
         <select name="categoryName" className="form-input responsive-select" value={data.categoryName} onChange={handleInput} required>
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
          <input type="text"
            name="subCategory"
            className="form-input"
            placeholder="Enter sub category (gpu, keyboard,etc..)"
            value={data.subCategory}
            onChange={handleInput}
            required/>
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
            onChange={handleInput} ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image" className="form-label">
            Category Image <span className="required">*</span>
          </label>
          <div className="image-upload-container">
            <label htmlFor="image" className="form-input">
              <input type="file" name="image" accept="image/* "required onChange={handleInput}/>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}> Cancel</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </div>
    )
}