import axios from "axios";

  
  // const BASE_URL='http://192.168.2.102:4000/api'
const BASE_URL = `https://smartsalon.in/api`;



// Base Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your base API URL
  timeout: 30000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async (method="post", url, data = null, params = null,) => {
  const authString =localStorage.getItem("frntoken");
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data,
      params,
      headers:authString?{ 'Authorization': `Bearer ${authString}` }:{}
    });
    return response.data; // Return the API response data
  } catch (error) {
    console.error("API Request Error:", error.message);
    throw error.response?.data || error.message; // Throw error response or message
  }
};

export default apiRequest;
