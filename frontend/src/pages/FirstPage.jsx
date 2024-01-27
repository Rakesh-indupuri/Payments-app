import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
export const FirstPage=()=>{
    const navigate=useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
          navigate("/dashboard");
        } else {
          navigate("/signin");
        }
      }, [navigate]);
    return null;
}