import { useLocation, Navigate } from "react-router-dom";

export default function PrivateUserRoute({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('login-token');
    if (token === null) {
        return <Navigate to={`/login${location.search}`} state={{ from: location }} replace></Navigate>
    }
    return children;
}

