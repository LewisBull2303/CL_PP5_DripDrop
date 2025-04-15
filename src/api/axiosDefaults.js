import axios from "axios"

axios.defaults.baseURL = "https://dripdrop-drf-api-8425aae53a44.herokuapp.com/"
// Set the expected data format by the api
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Set to avoid any CORS errors when sending cookies
axios.defaults.withCredentials = true;

// Refreshing the access tokens
export const axiosReq = axios.create();
export const axiosRes = axios.create();