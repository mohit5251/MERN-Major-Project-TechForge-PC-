import { useQuery } from "@tanstack/react-query"
import { deleteUser, displayUser } from "../API/ApiServices"
import { Loading } from "../components/layout/Loading"
import { toast } from "react-toastify"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export const UserAdmin = () => {

    const [loading, setLoading] = useState(false);

    //Display Data using useQuery
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ["UserAdminDisp"],
        queryFn: displayUser,
        retry: false,
    })

    if(isLoading) return <Loading/>

    //Main Data to Display
    const userData = data?.data?.userData;

    const handleDelete = async(id) => {
        try {
            setLoading(true);
            const response = await deleteUser(id);
            if(response.status === 200){
                toast.success(response?.data?.message);
                refetch();
                setLoading(false);
            }
        } catch (error) {
            console.log("user Delete Error: ",error);
            toast.success(error?.response?.data?.message);
        } finally{
            setLoading(false);
        }
    }
    

    return (
        <div className="container py-4 my-4">
            {/* Main card container with rounded corners */}
            <div className="card shadow" style={{ 
                borderRadius: '15px',  // 👈 This applies rounded corners to the entire container
                overflow: 'hidden'    // Ensures child elements respect the border radius
            }}>
                <div className="card-header bg-dark text-white">
                    <h3 className="p-2 text-center">User Management</h3>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        {/* Table with no rounded corners - will follow container's shape */}
                        <table className="table table-hover table-light table-striped mb-0">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="text-center">#</th>
                                {
                                    isError ? <p>Some Error Occurs</p> :
                                    Object.entries(userData[0]).filter(([key]) => !["_id","__v", "password", "isAdmin"].includes(key)).map(([key]) => (
                        
                                            <th scope="col" className="text-center" key={key}>{key}</th>

                                    ))  
                                }
                                    <th scope="col" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isError ? <p className="text-danger text-center">Some Error Occurs</p> :
                                    userData?.map((user, index) => (

                                        <tr key={user._id}>
                                            <th scope="row" className="text-center px-3">{index + 1}</th>
                                            <td className="text-center px-3">{user.name}</td>
                                            <td className="text-center px-3">{user.email}</td>
                                            <td className="text-center px-3">{user.phone}</td>
                                            <td className="text-center px-3">
                                                {
                                                    user.isEmailValid ? <span className="badge bg-success">valid</span>
                                                    :  <span className="badge bg-danger">InValid</span>
                                                }
                                                
                                            </td>
                                            <td className="text-center px-3">{user.createdAt}</td>
                                            <td className="text-center px-3">{user.updatedAt}</td>
                                            

                                            <td className="text-center px-3">
                                                <div className="d-flex flex-wrap justify-content-center gap-1">
                                                    <NavLink to={`/admin/users/edit/${user._id}`}><button className="btn btn-sm btn-info">Edit</button></NavLink>
                                                    <button className="btn btn-sm btn-danger" disabled={loading} onClick={() => handleDelete(user._id)}>{ loading ? "Deleting..." : "Delete"}</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}