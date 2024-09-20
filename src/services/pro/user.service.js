import API_REQUEST from "../utils/axios.utils";

const baseUrl = `https://prosaloncart.com`;
// const baseUrl = `http://192.168.2.211:4001`;

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
const ORDERS_DETAILS_FOR_EXCEL=async(payload)=>{
    const url = `${baseUrl}/role2/getAllOrderForXcelFile`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const SINGLE_ORDERS_DETAILS=async(payload)=>{
    const url = `${baseUrl}/role2/getSingleProductOrderData?id=${payload.id}`;
    console.log("payload",payload)
    const authString = localStorage.getItem("protoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const SINGLE_PRODUCT_DETAILS=async(payload)=>{
    const url = `${baseUrl}/user/getSingleProductData?id=${payload.shortUrl}`;
    console.log("payload",payload)
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
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}

const UPLOAD_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/upload`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const CREATE_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/product/createProduct`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const ADD_VIDEO_TO_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/product/addVideo/${payload.productId}/${payload.videoId}`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}
const ADD_QR_TO_PRODUCT=async(payload)=>{
    const url = `${baseUrl}/createQrcode/${payload}`;
    const authString = localStorage.getItem("protoken");
    console.log(authString,"protoken")
    const response = await API_REQUEST(url,"post",null,authString);
    return response;
}
const EDIT_PRODUCT_DETAILS=async(payload)=>{
    const url = `${baseUrl}/form/updateProductInfo`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString)
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const EDIT_ORDER_STATUS=async(payload)=>{
    const url = `${baseUrl}/role2/changeProductOrderStatus`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString);
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const EDIT_STOCK_QUANTITY=async(payload)=>{
    const url = `${baseUrl}/role2/updateStockQuantity`;
    const authString = localStorage.getItem("protoken");
    console.log("protoken",authString);
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}

export {
    PRO_LOGIN_USERS,
    ORDERS_DETAILS,
    SINGLE_ORDERS_DETAILS,
    ORDERS_DETAILS_FOR_EXCEL,
    SEARCH_PRODUCT,
    SINGLE_PRODUCT_DETAILS,
    UPLOAD_PRODUCT,
    ADD_QR_TO_PRODUCT,
    ADD_VIDEO_TO_PRODUCT,
    SALONCART_PRODUCTS,
    CREATE_PRODUCT,
    EDIT_PRODUCT_DETAILS,
    EDIT_ORDER_STATUS,
    EDIT_STOCK_QUANTITY
}