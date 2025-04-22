import { userInstance } from "../axios/axiosInstance"



export const userLogin = (data, role) => {
    return userInstance.post(`/user/login?role=${role}`, data)
}