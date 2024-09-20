import axios from "axios";

const API_REQUEST = async (url, method, data= null, authString= null) => {
    console.log(authString,"pro")
    const response = await axios({
        method,
        url,
        data,
        headers: authString ? { 'Authorization': `Bearer ${authString}` } : {},
        timeout: 10000
    })
        .then((res) => res.data)
        .catch((error) => {
            const errMessage = error.message;
            console.log({ errMessage })
        })

    if (response?.success) return response?.data;
    return response?.data;
}

export default API_REQUEST;
