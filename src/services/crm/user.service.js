import API_REQUEST from "../utils/axios.utils";

// const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user`;
const baseUrl = `http://192.168.2.19:4002`;



const LOGIN_USERS = async(payload)=>{
    const url =`${baseUrl}/parlor/login`;
    console.log({payload});
    const response = await API_REQUEST(url,"post",payload)
    return response;
}
const PARLOUR_DETAILS=async(payload)=>{
    const url = `${baseUrl}/parlor/getAllParlorsDetail`;
    const authString = localStorage.getItem("crmtoken");
    const response = await API_REQUEST(url,"get",payload,authString);
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

export {
    LOGIN_USERS,
    PARLOUR_DETAILS,
    PARLOUR_UPLOADSPDF,
    SINGLE_PARLOUR_DETAILS
}