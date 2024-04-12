import { Outlet, Navigate } from 'react-router-dom'

export default function PrivatePages(){
    const tokenExists = !!localStorage.getItem("token");
    return(
        tokenExists ? <Outlet/> : <Navigate to="/login"/>
    )
}