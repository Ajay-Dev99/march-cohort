import { userInstance } from "../axios/axiosInstance"



export const userLogin = (data) => {
    return userInstance.post("/user/login", data)
}