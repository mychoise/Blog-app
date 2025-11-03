import express from "express";
import { blogModel } from "../models/blog.model.js";
import main from "../config/gemini.js";

export const addBlog  = async (req, res) => {
  try {
    const { title, category, status,  summary, description } = req.body;

    // Validate required fields
    if (!title || !category || !status || !summary || !description) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // Create new blog
    const newBlog = new blogModel({
      title,
      category,
      status,
      author:"Sabin Dhakal",
      image: req.file.path, // default placeholder image
      summary,
      description,
    });

    await newBlog.save();
    res.status(201).json({ success:true, blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}
export const listBlog = async(req,res)=>{
  try {
    const blog = await blogModel.find({status:"published"})
    res.status(201).json({success:true , blog})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

export const listAllBlog = async(req,res)=>{
  try {
    const blog = await blogModel.find()
    res.status(201).json({success:true , blog})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

export const Toggle = async(req,res)=>{
try {
       let { id } = req.body;
if(!id){
  return res.json({message:"PROVIDE CORRECT ID"})
}
  const blog =   await blogModel.findById(id)
  console.log(blog)
if(!blog){
  return res.json({message:"BLOG NOT found"})
}
  if(blog.status==="unpublished"){
    blog.status = "published"
    await blog.save()
  }
  else{
     blog.status = "unpublished"
    await blog.save()
  }

  res.json({success:true , blog})

} catch (error) {
   console.error(error);
    res.status(500).json({ message: "Server error", error });
}
}


export const getBlogById= async(req,res)=>{
try {
  const {blogId} = req.params
  const blog = await blogModel.findById(blogId)
  if(!blog){
    return res.json({success:false , message:"Blog not found"})
  }
  res.status(201).json({success:true , blog})
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
}
}
export const deleteBlogById = async(req,res)=>{
  try {
     const { id } = req.body;
  const blog =   await blogModel.findOneAndDelete({_id:id});
  console.log(blog)
  res.json({success:true , message:"blog deleted success",blog})
  } catch (error) {
     console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}
export const generateContent = async(req,res)=>{
  try {
    const {prompt} = req.body;
    const content = await main(prompt + "Generate a blog content for this topic in simple text format")
    res.json({success:true , content})
  } catch (error) {
        res.json({success:false , message:error.message})

  }
}