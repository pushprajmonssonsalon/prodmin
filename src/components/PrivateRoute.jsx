import { Navigate } from 'react-router';
import { clearSession, isTokenExpired } from '../services/utils/session';

// portal: "crm" | "pro" | "franchise". `isCrm` is kept for existing usages (true => crm, false => pro).
const PrivateRoute = ({ component: Component, isCrm, portal }) => {
    const tokenKey = portal === "franchise"
        ? "frntoken"
        : (portal === "crm" || (!portal && isCrm)) ? "crmtoken" : "protoken";
    const token = localStorage.getItem(tokenKey);

    if (!token || isTokenExpired(token)) {
        if (token) clearSession();
        return <Navigate to="/" replace />;
    }
    return <Component />;
}

export default PrivateRoute
