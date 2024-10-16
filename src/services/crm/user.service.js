import API_REQUEST from "../utils/axios.utils";

const baseUrl = `https://crm.smartsalon.in`;
// const baseUrl = `http://192.168.2.215:4002`;
// const baseUrl = `http://192.168.2.38:4002`;

const baseUrl2 = `https://app.smartsalon.in`;
const LOGIN_USERS = async (payload) => {
  const url = `${baseUrl}/admin/login`;
  console.log({ payload });
  const response = await API_REQUEST(url, "post", payload);
  return response;
};
const GET_BRANDS = async () => {
  const url = `${baseUrl}/user/getBrands`;
  const response = await API_REQUEST(url, "get");
  return response;
};
const PARLOUR_DETAILS = async (payload) => {
  const url = `${baseUrl}/finance/getAllParlorsDetail?page=${payload.page}&limit=${payload.limit}&salonType=${payload.salonType}`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "get", null, authString);
  return response;
};
const PARLOUR_UPLOADSPDF = async (payload) => {
  console.log("payload", payload);
  const url = `${baseUrl}/uploadPdf`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const PO_UPLOADSPDF = async (payload) => {
  console.log("payloadcoming", payload);
  const url = `${baseUrl}/uploadPO`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const SINGLE_PARLOUR_DETAILS = async (payload) => {
  const url = `${baseUrl}/finance/getSalonRoyaltyInvoiceofSingleSalon`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};

const SINGLE_SALON_DETAILS = async (payload) => {
  const url = `${baseUrl}/finance/getSingleParlorDetail?id=${payload.salonId}`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "get", null, authString);
  return response;
};
const GET_TABLE = async (payload) => {
  const url = `${baseUrl}/finance/getSettlementData?month=${payload.month}&year=${payload.year}&salonType=${payload.salonType}`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "get", null, authString);
  return response;
};
const CREATE_TABLE = async (payload) => {
  const url = `${baseUrl}/finance/createSettlement`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
// const POORDERS_TABLE=async(payload)=>{
//     const url = `${baseUrl}/finance/getAllPurchaseOrder?page=${payload.page}&limit=${payload.limit}`;
//     const authString = localStorage.getItem("crmtoken");
//     const response = await API_REQUEST(url,"post",payload.data,authString);
//     return response
// }
const UPLOAD_VIDEO = async (payload) => {
  const url = `${baseUrl2}/operation/uploadTrainingVideo`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const CREATE_VEDIO = async (payload) => {
  const url = `${baseUrl2}/operation/createVideo`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const SEND_NOTIFICATION = async (payload) => {
  const url = `${baseUrl2}/notification/sendNotificationToUsers
`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const UPDATE_VEDIO = async (payload) => {
  const url = `${baseUrl}/operation/editProductVideo`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const GET_ALL_VEDIOS = async (brand, type) => {
  const url = `${baseUrl}/operation/getAllVideos/?brand=${brand}&type=${type}`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "get", authString);
  return response;
};
const GET_ALL_PRODUCTS = async (payload, itemsPerPage, currentPage) => {
  const url = `${baseUrl}/inventory/getAllProducts/?limit=${itemsPerPage}&page=${currentPage}`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const UPLOAD_THUMBNAIL = async (payload) => {
  const url = `${baseUrl2}/operation/uploadThumbnail`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const EDIT_INVENTORY = async (payload) => {
  const url = `${baseUrl2}/operation/editInventoryProduct`;

  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};

const SINGLE_POORDER = async (payload) => {
  const url = `${baseUrl}/finance/getSinglePurchaseOrderDetail`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const UPDATE_EXCEL_FILE = async (payload) => {
  const url = `${baseUrl}/finance/updateSettlement`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const CREATE_BULK_PRODUCT = async (payload) => {
  const url = `${baseUrl2}/operation/addProductToInventory`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const CHANGE_PO_STATUS = async (payload) => {
  const url = `${baseUrl}/finance/changePOStatus`;
  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};
const POORDERS_FILTER = async (payload) => {
  // console.log("payload.salonType", payload.salonType !== "" ? payload.salonType : null);

  // Construct query parameters based on payload values
  let queryParams = [];
  if (payload.salonType !== "")
    queryParams.push(`salon=${encodeURIComponent(payload.salonType)}`);
  if (payload.page)
    queryParams.push(`page=${encodeURIComponent(payload.page)}`);
  if (payload.rowsPerPage)
    queryParams.push(`limit=${encodeURIComponent(payload.rowsPerPage)}`);
  if (payload.status !== "")
    queryParams.push(`status=${encodeURIComponent(payload.status)}`);
  if (payload.search !== "")
    queryParams.push(`poId=${encodeURIComponent(payload.search)}`);

  // Join query parameters with '&'
  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  // Construct the URL with query parameters
  const url = `${baseUrl}/finance/getAllPurchaseOrder${queryString}`;

  const authString = localStorage.getItem("crmtoken");
  const response = await API_REQUEST(url, "post", payload, authString);
  return response;
};

export {
  LOGIN_USERS,
  PARLOUR_DETAILS,
  PARLOUR_UPLOADSPDF,
  SINGLE_PARLOUR_DETAILS,
  SINGLE_SALON_DETAILS,
  CREATE_TABLE,
  GET_TABLE,
  CREATE_BULK_PRODUCT,
  GET_ALL_PRODUCTS,
  SEND_NOTIFICATION,
  UPDATE_VEDIO,
  GET_BRANDS,
  UPLOAD_VIDEO,
  CREATE_VEDIO,
  GET_ALL_VEDIOS,
  EDIT_INVENTORY,
  UPLOAD_THUMBNAIL,
  SINGLE_POORDER,
  UPDATE_EXCEL_FILE,
  CHANGE_PO_STATUS,
  POORDERS_FILTER,
  PO_UPLOADSPDF,
};
