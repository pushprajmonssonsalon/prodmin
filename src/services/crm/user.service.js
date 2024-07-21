import API_REQUEST from "../utils/axios.utils";

const baseUrl = `https://crm.smartsalon.in`;
// const baseUrl = `http://192.168.2.30:4002`;

const LOGIN_USERS = async(payload)=>{
    const url =`${baseUrl}/parlor/login`;
    console.log({payload});
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const PARLOUR_DETAILS=async(payload)=>{
    const url = `${baseUrl}/finance/getAllParlorsDetail?page=${payload.page}&limit=${payload.limit}`;
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
const POORDERS_TABLE=async(payload)=>{
    const url = `${baseUrl}/finance/getAllPurchaseOrder?page=${payload.page}&limit=${payload.limit}`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload.data,authString);
    return response
}
const SINGLE_POORDER=async(payload)=>{
    const url = `${baseUrl}/finance/getSinglePurchaseOrderDetail`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response
}
const UPDATE_EXCEL_FILE=async(payload)=>{
    const url = `${baseUrl}/finance/updateSettlement`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response
}
const CHANGE_PO_STATUS=async(payload)=>{
    const url = `${baseUrl}/finance/changePOStatus`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload,authString);
    return response
}
const POORDERS_FILTER=async(payload)=>{
    const url = `${baseUrl}/finance/getAllPurchaseOrder?search=${payload.search}&status=${payload.status}&salon=${payload.salonType}`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"post",payload.data,authString);
    return response
}



export {
    LOGIN_USERS,
    PARLOUR_DETAILS,
    PARLOUR_UPLOADSPDF,
    SINGLE_PARLOUR_DETAILS,
    SINGLE_SALON_DETAILS,
    CREATE_TABLE,
    GET_TABLE,
    POORDERS_TABLE,
    SINGLE_POORDER,
    UPDATE_EXCEL_FILE,
    CHANGE_PO_STATUS,
    POORDERS_FILTER
}