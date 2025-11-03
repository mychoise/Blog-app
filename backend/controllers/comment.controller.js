import express from "express";
import { commentModel } from "../models/comment.model.js";

export const addComment = async (req, res) => {
  try {
    const { name, comment, blog } = req.body;

    if (!name || !comment || !blog) {
      return res.status(400).json({
        success: false,
        message: "Provide all credentials including blog ID",
      });
    }

    const comm = await commentModel.create({
      name,
      comment,
      blog, // should be a valid ObjectId
    });

    res.status(200).json({ success: true, data: comm });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const listComment = async (req, res) => {
  try {
    const { id } = req.body // or req.params if you're using route params

    if (!id) {
      return res.status(400).json({ message: "Blog ID is required" })
    }

    const comments = await commentModel.find({ blog: id }).sort({ createdAt: -1 })

    res.status(200).json(comments)
  } catch (error) {
    console.error("Error fetching comments:", error)
    res.status(500).json({ message: "Failed to fetch comments" })
  }
}
export const listAllComments = async(req,res)=>{
  try {
    const comments = await commentModel.find()
        res.status(200).json(comments)

  } catch (error) {
      console.error("Error fetching comments:", error)
    res.status(500).json({ message: "Failed to fetch comments" })
  }
}
export const toggleComment = async(req,res)=>{

try {
  let {id,approved} = req.body;
  if(!id){
  return res.json({message:"Provide id"})
  }
  console.log(approved)
if(approved===undefined){
  return res.json({message:"Provide approved"})
}
const comm = await commentModel.findById(id)
if(!comm){
    return res.json({message:"Comment not available"})
}
if(approved){
  comm.isApproved = false
  await comm.save()
}
else{
  comm.isApproved = true
  await comm.save()
}

return res.json({success:true , comm})
} catch (error) {
  console.error("Error toggling comment:", error)
    res.status(500).json({ message: "Failed to toggle comment" })
}


}
export const deleteComment = async(req,res)=>{
  try {
    let{id} = req.body;
    if(!id){
      return res.json({message:"Give id"})
    }
    console.log("comment id", id)
  const response =   await commentModel.findByIdAndDelete(id)
    res.json({success:true, message:"deleted succesfully"})

  } catch (error) {
    console.error("Error deleting comment:", error)
    res.status(500).json({ message: "Failed to delete comment" })
  }
}