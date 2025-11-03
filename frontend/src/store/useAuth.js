import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStote = create((set)=>({
   authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async()=>{
    try {
      const res = await axiosInstance.get("/auth/check")
    set({authUser:res.data})
    set({isCheckingAuth:false})
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking auth:", error);
set({isCheckingAuth:false})

    }
  }  ,
login: async ({ email, password }) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });

    if (res.data.success === false) {
      toast.error(res.data.message);
      return;
    }

    set({ authUser: res.data.user });
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error("Login failed:", error);
    set({ authUser: null });
    toast.error(error?.response?.data?.message || "Login failed");
  } finally {
    set({ isLoggingIn: false });
  }
}

}))