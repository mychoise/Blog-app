import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
export const useCommentStore = create((set) => ({
  isLoadingComment: false,
  isAddingComment: false,
  error: null,
  comments: [],
  Allcomments:[], // ✅ renamed from `comment` to `comments` for clarity

  addComments: async (blogId, name, comment) => {
    set({ isAddingComment: true, error: null })
    try {
      await axiosInstance.post("/comment/addComment", {
        blog: blogId,
        name,
        comment,
      })
      toast.success("Comment added , but will be shown after appproval")
    } catch (err) {
      console.error("Failed to add comment:", err)
      set({ error: err?.response?.data?.message || "Something went wrong" })
    } finally {
      set({ isAddingComment: false })
    }
  },

  listComments: async (blogId) => {
    set({ isLoadingComment: true, error: null })
    try {
      const response = await axiosInstance.post("/comment/listComment", { id: blogId })
      set({ comments: response.data, isLoadingComment: false })
    } catch (error) {
      console.error("Failed to fetch comments:", error)
      set({ isLoadingComment: false, error: "Failed to fetch comments" })
    }
  },
  listAllComments:async()=>{
try {
  const res = await axiosInstance.get("/comment/listAllComments")
  set({Allcomments:res.data})
} catch (error) {
  console.log("Failed to get comments",error)
}
  },
  togglecomment: async ({ id, approved }) => {
  try {
    await axiosInstance.post("/comment/toggle", { id, approved });
    toast.success(!approved ? "Comment Approved" : "Unapproved Comment");

    const res = await axiosInstance.get("/comment/listAllComments");
    set({ Allcomments: [...res.data] }); // ensure a new reference for re-render
  } catch (error) {
    console.log("Failed to toggle comment", error);
  }
},
  deleteComment:async(id)=>{
    try {
      await axiosInstance.post("/comment/delete",{id})
           toast.success("Comment deleted")
 const res = await axiosInstance.get("/comment/listAllComments");
    set({ Allcomments: [...res.data] })
 
    } catch (error) {
       console.log("Failed to delete comment",error)
    }
  }
}))