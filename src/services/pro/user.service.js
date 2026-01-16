import API_REQUEST from "../utils/axios.utils";

const baseUrl = `https://prosaloncart.com`;
// const baseUrl = `http://192.168.2.210:4001`;
// const baseUrl = `http://192.168.2.49:4007`;

const PRO_LOGIN_USERS = async(payload)=>{
    const url =`${baseUrl}/user/adminLogin`;
    
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const ORDERS_DETAILS=async(payload)=>{
    const url = `${baseUrl}/role2/getAllProductOrders`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const ORDERS_DETAILS_FOR_EXCEL=async(payload)=>{
    const url = `${baseUrl}/role2/getAllOrderForXcelFile`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const SINGLE_ORDERS_DETAILS=async(payload)=>{
    const url = `${baseUrl}/role2/getSingleProductOrderData?id=${payload.id}`;
    
    const authString = localStorage.getItem("protoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const SINGLE_PRODUCT_DETAILS=async(payload)=>{
    const url = `${baseUrl}/user/getSingleProductData?id=${payload.shortUrl}`;
    
    const authString = localStorage.getItem("protoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const SALONCART_PRODUCTS=async(payload)=>{
    const url = `${baseUrl}/user/getAllProducts`;
    const authString = localStorage.getItem("protoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const SEARCH_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/user/getSearchedProduct?name=${payload.name}`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}

const UPLOAD_IMAGE=async(payload)=>{
    const url = `${baseUrl}/upload`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const CREATE_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/product/createProduct`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const ADD_VIDEO_TO_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/product/addVideo/${payload.productId}/${payload.videoId}`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}
const ADD_QR_TO_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/createQrcode/${payload}`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}
const EDIT_PRODUCT_DETAILS=async(payload)=>{
    const url = `${baseUrl}/form/updateProductInfo`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const EDIT_ORDER_STATUS=async(payload)=>{
    const url = `${baseUrl}/role2/changeProductOrderStatus`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const EDIT_STOCK_QUANTITY=async(payload)=>{
    const url = `${baseUrl}/role2/updateStockQuantity`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const FETCH_SINGLE_ORDER=async(payload)=>{
    const url = `${baseUrl}/role2/getSingleOrderData?id=${payload}`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"get",{},authString);
    return response;
}
const CREATE_IN_EASYCOM=async(payload)=>{
    const url = `${baseUrl}/role2/fetchOrderInEasycom`;
    const authString = localStorage.getItem("protoken");
    
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const GET_PRODUCT_LIST = async (payload) => {
  const { page, limit, isActive } = payload;

  const url = `${baseUrl}/role2/getProductList?page=${page}&limit=${limit}&isActive=${isActive}&brand=Spring H2O`;

  const authString = localStorage.getItem("protoken");
  const response = await API_REQUEST(url, "get", null, authString);
  return response;
};

export {
    PRO_LOGIN_USERS,
    ORDERS_DETAILS,
    CREATE_IN_EASYCOM,
    SINGLE_ORDERS_DETAILS,
    ORDERS_DETAILS_FOR_EXCEL,
    SEARCH_PRODUCT,
    FETCH_SINGLE_ORDER,
    SINGLE_PRODUCT_DETAILS,
    UPLOAD_IMAGE,
    ADD_QR_TO_PRODUCT,
    ADD_VIDEO_TO_PRODUCT,
    SALONCART_PRODUCTS,
    CREATE_PRODUCT,
    EDIT_PRODUCT_DETAILS,
    EDIT_ORDER_STATUS,
    EDIT_STOCK_QUANTITY,
    GET_PRODUCT_LIST
}