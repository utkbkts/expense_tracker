import _axios from "axios";


const axiosInstance = _axios.create({
    baseURL:`${import.meta.env.VITE_REACT_APP_URL}/api/v1` ||"/api/v1",
    withCredentials:true
})

export { axiosInstance as axios };