import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";


export default function AuthLayout({ children, authenticated = true}){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    const authStatus = useAuthStore(state => state.isLoggedIn);
    const loadUserFromStorage = useAuthStore(state => state.loadUserFromStorage);

    useEffect(() => {
        loadUserFromStorage();
    }, []);

    useEffect(() => {
        if(authenticated && !authStatus){
            navigate('/signin');
        } else if(!authenticated && authStatus){
            navigate('/dashboard');
        } else {
            setLoader(false);
        }
    }, [authStatus, navigate, authenticated]);

    return (
        loader ? <h1 className="text-center mt-10 text-xl">Loading...</h1> : <>{children}</>
    );
}