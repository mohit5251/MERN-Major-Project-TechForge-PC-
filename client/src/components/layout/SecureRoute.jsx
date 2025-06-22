import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useAuth } from "../../store/AuthUser"
import { Loading } from "./Loading";

export const SecureRoute = () => {

    const {user, isLoading} = useAuth();
    const navigation = useNavigation();

    const stillLoading = navigation.state === "loading";
    
    // Wait until auth is loaded completely
    if (isLoading || typeof user === "undefined") return <Loading />;

    // Show loading for route transitions
    if (stillLoading) return <Loading />;

    if (!user) return <Navigate to="/login" replace state={{ message: "Please login first" }}/>;

    if (!user.isEmailValid) return <Navigate to="/verify-email" replace />;


    return (
        <>
            <Outlet />
        </>
    )
}