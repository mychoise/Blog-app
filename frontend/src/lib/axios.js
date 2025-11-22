import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blog-app-taupe.vercel.app/api", // point to your deployed backend
  withCredentials: true // if using cookies
});
