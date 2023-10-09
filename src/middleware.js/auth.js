import { Navigate } from "react-router-dom";


export const ProtectRoute = ({ children }) => {
    const username = localStorage.getItem('chat-app-user')
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}