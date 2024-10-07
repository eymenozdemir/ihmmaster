import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = localStorage.getItem("user");
    return getTokenFromLocalStorage !== null ? children : (<Navigate to={'/'} replace={true} />)
}