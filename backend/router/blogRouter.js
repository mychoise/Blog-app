import express from "express";
import { addBlog, deleteBlogById, generateContent, getBlogById, listAllBlog, listBlog, Toggle } from "../controllers/blog.controller.js";
import {authMiddle} from "../middlewares/authMiddle.js"
import upload from "../config/Image.config.js"
const blogRouter = express.Router()

blogRouter.post("/addblog",authMiddle,upload.single("image"),addBlog)
blogRouter.get("/listblog",listBlog)
blogRouter.get("/listAllblog",listAllBlog)
blogRouter.get("/:blogId",getBlogById)
blogRouter.post("/delete",deleteBlogById)
blogRouter.post("/toggle",Toggle)
blogRouter.post("/generate",authMiddle,generateContent)
export default blogRouter