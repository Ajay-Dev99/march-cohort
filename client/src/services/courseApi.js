import { userInstance } from "../axios/axiosInstance"

export const getCourses = () => {
    return userInstance.get("/course/list-courses")
}