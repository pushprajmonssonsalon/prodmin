import axios from "axios";
import { attachSessionInterceptor } from "../utils/session";
import { withErrorHandling } from "../utils/errorHandler";

  
  // const BASE_URL='http://192.168.2.102:4000/api'
// franchise login + leads live in monsoonback (leads are saved there by the website franchise form)
const BASE_URL = process.env.REACT_APP_WEBSITE_API_URL || `https://www.monsoonsalon.com/api`;


// Base Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your base API URL
  timeout: 30000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

attachSessionInterceptor(axiosInstance);

const apiRequest = async (method="post", url, data = null, params = null,) => {
  const authString =localStorage.getItem("frntoken");
  return withErrorHandling(() => axiosInstance.request({
      method,
      url,
      data,
      params,
      headers:authString?{ 'Authorization': `Bearer ${authString}` }:{}
    }));
};

export default apiRequest;
