import axios from "axios"

axios.defaults.baseURL = "https://"
// Set the expected data format by the api
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Set to avoid any CORS errors when sending cookies
axios.defaults.withCredentials = true;
