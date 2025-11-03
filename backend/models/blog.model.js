import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    reading_time: { type: String },
    author: {
      type: String,
    required:true,
    },
    image: { type: String },
    summary: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);
export const blogModel = mongoose.model("blogModel", BlogSchema);
