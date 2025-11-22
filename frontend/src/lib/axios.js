import axios from "axios"

export const axiosInstance  = axios.create({
    baseURL:"https://blog-54rqnhpzj-sabin-dhakals-projects.vercel.app/api",
    withCredentials:true
})
