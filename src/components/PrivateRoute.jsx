import React from 'react'
import { Navigate } from 'react-router';

const PrivateRoute = ({ component: Component }) => {
    // const token = localStorage.getItem('token')
    const token = "tuishar"
    return !token ?  <Navigate to={"/login"} /> : <Component />;
}

export default PrivateRoute
