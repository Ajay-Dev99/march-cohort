import { userInstance } from "../axios/axiosInstance"

export const addTocart = (id) => {
    return userInstance.post(`/cart/addtocart/${id}`)
}
export const getCart = () => {
    return userInstance.get(`/cart/getcart`)
}

export const makePayment = (data) => {
    return userInstance.post("/payment/stripe-checkout", data)
}

