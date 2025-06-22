import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { displayCart, fetchAuthData } from "../API/ApiServices";
import { useContext } from "react";

//creating context
export const AuthContext = createContext();

//create context provider
export const AuthProvider = ({children}) => {

        const {data, isError, isLoading, error, refetch} = useQuery({
            queryKey: ["authUser"],
            queryFn: fetchAuthData,
            retry: false, // ❗️important to prevent retry loop on 401
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
        });

        const [user,setUser] = useState(undefined);

        useEffect(() => {
            if (!isLoading) {
                console.log("Auth user updated:", data);
                setUser(data?.user || null);
            }
        }, [data, isLoading]);


        // Getting Total No Of Cart Item
        const { data: cartData, isLoading: cartLoading, refetch: refetchCart, isError: cartIsError , error: cartError} = useQuery({
            queryKey: ["countCartItem"],
            queryFn: displayCart,
            retry: false,
            enabled: false, // prevent auto-fetch
        });
        


    return <AuthContext.Provider value={{user, isLoading, isError, error, refetchAuth: refetch,   cartData, cartLoading, refetchCart, cartIsError, cartError}} >
                {children}
            </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}

