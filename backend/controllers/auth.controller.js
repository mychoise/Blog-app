import express from "express";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all credentials",
      });
    }

    // Find user by email
    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      return res.status(400).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    // Compare password
    const isPassword = await bcryptjs.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(400).json({
        success: false,
        message: "Email or password incorrect",
      });
    }

    // Generate token
    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECREAT, {
      expiresIn: "7d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: isUser._id,
        email: isUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login instead.",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECREAT, {
      expiresIn: "7d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
export const checkAuth = async(req,res)=>{
  const id=req.userId
  try {
    console.log(id)
    const user =  await userModel.findOne({_id:id})

    if(!user){
      return res.json({message:"Sorry uuser not found"})
    }
    res.status(200).json(user)
  } catch (error) {
        console.log("error in check", error)
   res.status(400).json({message:"Error occured while checking auth"}) 
  }
}