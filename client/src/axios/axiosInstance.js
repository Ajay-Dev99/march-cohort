import axios from "axios";

export const userInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


userInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})

