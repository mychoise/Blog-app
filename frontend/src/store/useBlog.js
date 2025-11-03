import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios";

export const useBlogStore = create((set) => ({
  Blogs: [],           // All blogs
  selectedBlog: null,  // Single blog
  isLoading: false,
  error: null,
  isAddingBlog:false,
  allBlogs:[],
  //Fetch all blog
  listAllBlog:async()=>{
set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/blog/listAllBlog");
            console.log(res)

      const allBlogs = res.data.blog;
      set({ allBlogs  , isLoading: false });
    } catch (err) {
      console.error(err);
      set({ error: err.message, isLoading: false });
    }
  },

  // Fetch published blog only
  listBlog: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/blog/listblog");
      const Blogs = res.data.blog;
      set({ Blogs, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: error.message, isLoading: false });
    }
  },

  // Fetch a single blog by ID
  getBlogById: async (blogId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/blog/${blogId}`);
      const blog = res.data.blog;  // assuming API responds with { blog: {...} }
      set({ selectedBlog: blog, isLoading: false });
      return blog; // return so component can use immediately
    } catch (err) {
      console.error(err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  addBlog:async(blogData)=>{
    set({isAddingBlog:true})
try {

    const res = await axiosInstance.post("/blog/addblog", blogData);
console.log(res)
toast.success("Blog added")
} catch (error) {
   console.error(error);
      set({ error: error.message, isLoading: false });
      return null;
}
finally{
        set({isAddingBlog:false})

}
  },

  toggle:async(id)=>{
try {
await axiosInstance.post("/blog/toggle",id);
    const res = await axiosInstance.get("/blog/listAllBlog");
 set({allBlogs:[...res.data.blog]})
} catch (error) {
   console.error(error);
}
  },
  Delete:async(id)=>{
try {
 await axiosInstance.post("/blog/delete",id);
  const res = await axiosInstance.get("/blog/listAllBlog");
 set({allBlogs:[...res.data.blog]})
} catch (error) {
   console.error(error);
}
  }

}));
