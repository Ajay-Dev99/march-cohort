import { userInstance } from "../axios/axiosInstance"

export const addTocart = (id) => {
    return userInstance.post(`/cart/addtocart/${id}`)
}
export const getCart = () => {
    return userInstance.get(`/cart/getcart`)
}

