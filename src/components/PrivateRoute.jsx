import { Navigate } from 'react-router';

const PrivateRoute = ({ component: Component,isCrm }) => {
    // const token = localStorage.getItem('token')
    const crmtoken = localStorage.getItem("crmtoken")
    const protoken = localStorage.getItem("protoken")
    

    if(isCrm){
        
        return !crmtoken ?  <Navigate to={"/login"} /> : <Component />;
    }
    else{
        return !protoken ?  <Navigate to={"/login"} /> : <Component />;

    }
    
}

export default PrivateRoute
