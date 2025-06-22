import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertPC } from "../API/ApiServices";
import { toast } from "react-toastify";

export const InsertPreBuildPcs = () => {

    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const[data, setData] = useState({
        name: "",
        price: "",
        processor: "",
        motherBoard: "",
        ram : "",
        graphicsCard: "",
        cpuCooler: "",
        ssd: "",
        smps: "",
        cabinet: "",
        others: "",
        image: "",
    });

    const handleInput = (e) => {
        const {name, value, files} = e.target;

        if(name === "image"){
            setData((prev) => ({ ...prev, image: files[0] }));
        }else{
            setData((prev) => ({ ...prev, [name] : value }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await insertPC(data);
            if(response.status === 200){
                toast.success(response?.data?.message);
                navigate("/admin/pcs");
            }
        } catch (error) {
            console.log("error while adding pc:",error);
            const errorData = error?.response?.data;
            toast.error(errorData?.extraDetails ? errorData?.extraDetails : errorData?.message);
            setLoading(false);
        } finally{
            setLoading(false);
        }
    }

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Add New PC</h2>
            <form className="category-form" method="post" onSubmit={handleSubmit}>
                
                {/* name */}
                <div className="form-group">
                <label htmlFor="name" className="form-label">
                    PC Name <span className="required">*</span>
                </label>
                <input type="text" name="name" className="form-input" placeholder="Enter pc name" required value={data.name} onChange={handleInput}/>
                </div>


                <div className="form-group">
                <label htmlFor="price" className="form-label">
                    Price <span className="required">*</span>
                </label>
                <input type="text" name="price" className="form-input" placeholder="Enter pc price" required value={data.price} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="processor" className="form-label">
                    Processor <span className="required">*</span>
                </label>
                <input type="text" name="processor" className="form-input" placeholder="Enter processor name" required value={data.processor} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="motherBoard" className="form-label">
                    MotherBoard <span className="required">*</span>
                </label>
                <input type="text" name="motherBoard" className="form-input" placeholder="Enter motherBoard name" required value={data.motherBoard} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="ram" className="form-label">
                    RAM <span className="required">*</span>
                </label>
                <input type="text" name="ram" className="form-input" placeholder="Enter RAM name" required value={data.ram} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="graphicsCard" className="form-label">
                    GraphicsCard <span className="required">*</span>
                </label>
                <input type="text" name="graphicsCard" className="form-input" placeholder="Enter graphicsCard name" required value={data.graphicsCard} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="cpuCooler" className="form-label">
                    cpuCooler <span className="required">*</span>
                </label>
                <input type="text" name="cpuCooler" className="form-input" placeholder="Enter cpuCooler name" required value={data.cpuCooler} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="ssd" className="form-label">
                    SSD <span className="required">*</span>
                </label>
                <input type="text" name="ssd" className="form-input" placeholder="Enter SSD name" required value={data.ssd} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="smps" className="form-label">
                    SMPS <span className="required">*</span>
                </label>
                <input type="text" name="smps" className="form-input" placeholder="Enter SMPS name" required value={data.smps} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="cabinet" className="form-label">
                    Cabinet <span className="required">*</span>
                </label>
                <input type="text" name="cabinet" className="form-input" placeholder="Enter cabinet name" required value={data.cabinet} onChange={handleInput}/>
                </div>

                <div className="form-group">
                <label htmlFor="others" className="form-label">
                    Others <span className="required">*</span>
                </label>
                <input type="text" name="others" className="form-input" placeholder="Enter others detail" required value={data.others} onChange={handleInput}/>
                </div>

                
                {/* Image Upload */}
                <div className="form-group">
                <label htmlFor="image" className="form-label">
                    PC Image <span className="required">*</span>
                </label>
                <div className="image-upload-container">
                    <label htmlFor="image" className="form-input">
                        <input type="file" name="image" accept="image/*" required onChange={handleInput}/>
                    </label>
                </div>
                </div>

                {/* Form Actions */}
                <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading} >
                    {loading ? "Saving..." : "Save PC"}
                </button>
                </div>
            </form>
        </div>
    );
}