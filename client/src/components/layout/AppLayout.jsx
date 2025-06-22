import { Outlet, useNavigation } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { ToastContainer,Bounce } from "react-toastify"
import { Loading } from "./Loading"

export const AppLayout = () => {

    const navigation = useNavigation();

    const stillLoading = navigation.state === "loading";

    if(stillLoading) return <Loading />;

    return <>
        <Header />
        {
            stillLoading? <Loading/> : <Outlet/>
        }
        <Footer />

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
}