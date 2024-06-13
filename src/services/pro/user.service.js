import API_REQUEST from "../utils/axios.utils";

// const baseUrl = `https://crm.smartsalon.in`;
const baseUrl = `http://192.168.2.17:4001`;

const PRO_LOGIN_USERS = async(payload)=>{
    const url =`${baseUrl}/user/adminLogin`;
    console.log({payload});
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const ORDERS_DETAILS=async(payload)=>{
    const url = `${baseUrl}/role2/getAllProductOrders`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}


export {
    PRO_LOGIN_USERS,
    ORDERS_DETAILS,
}