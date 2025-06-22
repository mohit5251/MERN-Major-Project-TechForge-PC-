import { Outlet, useNavigation } from "react-router-dom"
import { Loading } from "../components/layout/Loading";
import { useAuth } from "../store/AuthUser";
import { ErrorPage } from "../components/layout/ErrorPage";
import { Bounce, ToastContainer } from "react-toastify";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {

    const {user, isLoading} = useAuth();
    const navigation = useNavigation();

    const stillLoading = navigation.state === "loading";

    // Wait until auth is loaded completely
    if (isLoading || !user || typeof user === "undefined") return <Loading />;

    // Show loading for route transitions
    if (stillLoading) return <Loading />;

    // Protect admin routes
    if (!user.isAdmin) return <ErrorPage />;

    return (
        <>
            <AdminSidebar />
            <Outlet />
            
            <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition= {Bounce}
            />
        </>
    )
}