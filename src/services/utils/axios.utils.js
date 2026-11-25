import axios from "axios";
import { withErrorHandling } from "./errorHandler";

const API_REQUEST = async (url, method, data= null, authString= null) => {
    
    return withErrorHandling(() => axios({
        method,
        url,
        data,
        headers: authString ? { 'Authorization': `Bearer ${authString}` } : {},
        timeout: 10000
    }), (response) => response?.data);
}

export default API_REQUEST;
