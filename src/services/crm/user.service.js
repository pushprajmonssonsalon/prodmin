import API_REQUEST from "../utils/axios.utils";

// const baseUrl = `https://crm.smartsalon.in`;
const baseUrl = `http://192.168.2.30:4002`;

const LOGIN_USERS = async(payload)=>{
    const url =`${baseUrl}/parlor/login`;
    console.log({payload});
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const PARLOUR_DETAILS=async(payload)=>{
    const url = `${baseUrl}/parlor/getAllParlorsDetail?page=${payload.page}&limit=${payload.limit}`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const PARLOUR_UPLOADSPDF=async(payload)=>{
    const url = `${baseUrl}/uploadPdf`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const SINGLE_PARLOUR_DETAILS=async(payload)=>{
    const url = `${baseUrl}/finance/getSalonRoyaltyInvoiceofSingleSalon`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response;
}
const SINGLE_SALON_DETAILS=async(payload)=>{
    const url = `${baseUrl}/finance/getSingleParlorDetail?id=${payload.salonId}`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const GET_TABLE=async(payload)=>{
    const url = `${baseUrl}/finance/getSettlementData?month=${payload.month}&year=${payload.year}`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"get",null,authString);
    return response;
}
const CREATE_TABLE=async(payload)=>{
    const url = `${baseUrl}/finance/createSettlement`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response
}


export {
    LOGIN_USERS,
    PARLOUR_DETAILS,
    PARLOUR_UPLOADSPDF,
    SINGLE_PARLOUR_DETAILS,
    SINGLE_SALON_DETAILS,
    CREATE_TABLE,
    GET_TABLE
}