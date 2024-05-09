import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = (props)=>{
    const navigate = useNavigate();
    const {Component} = props;
    const token = Cookies.get("jwtToken");

    useEffect(()=>{
        if(token===undefined){
            navigate("/login");
        }
    })
    return(
        <Component/>
    )

}


export default ProtectedRoute;