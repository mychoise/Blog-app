import React, { useState, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quill base styles
import { useBlogStore } from "../../store/useBlog";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import {parse} from "marked"

const AddBlog = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [loading,setLoading] = useState()
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [publishNow, setPublishNow] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null); // actual file for upload
  const {addBlog , isAddingBlog} = useBlogStore()

  const quillRef = useRef(null); // container div ref
  const quillInstance = useRef(null);

  const categories = ["Design systems", "Side projects", "Thoughts", "Tools"];

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setThumbnail(URL.createObjectURL(file));
  setThumbnailFile(file);
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();

    if (thumbnailFile) {
      formData.append("image", thumbnailFile);
    }

    formData.append("title", title);
    formData.append("summary", subtitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("status", publishNow ? "published" : "unpublished");

    console.log("FormData ready to send to backend");
    
    // ✅ send to backend (example)
    await addBlog(formData);

    console.log("Blog submitted successfully!");

setTitle("");
setSubtitle("");
setDescription("");
setCategory("");
setPublishNow(false);
setThumbnail(null);
setThumbnailFile(null);
quillInstance.current.root.innerHTML=""



  } catch (error) {
    console.error("Error submitting blog:", error);
  }
};


  const handleGenerateAI = async() => {
    if(!title) return toast.error("please enter title")

      try {
        setLoading(true);
        const {data}= await axiosInstance.post("/blog/generate",{prompt:title})
        if(data.success){
           quillInstance.current.root.innerHTML = parse(data.content)
        }
      } catch (error) {
       console.log(error)
    toast.error("Failed to generate content: " + (error.response?.data?.message || error.message));
      }
  };

  // Initialize Quill
  useEffect(() => {
    if (quillInstance.current) return; // prevent double init

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      placeholder: "Write your blog content...",
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["blockquote", "code-block"],
          ["clean"],
        ],
      },
    });

    quillInstance.current.on("text-change", () => {
      setDescription(quillRef.current.querySelector(".ql-editor").innerHTML);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-200 p-8 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Upload thumbnail */}
        <div className="flex flex-col space-y-2">
          <label className="font-medium text-gray-300">Upload thumbnail</label>
          <label className="border border-gray-600 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-gray-400 transition">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="thumbnail"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400">Click to Upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Blog title */}
        <div>
          <label className="block mb-1 text-gray-300">Blog title</label>
          <input
            type="text"
            placeholder="Type here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#222] text-gray-100 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block mb-1 text-gray-300">Sub title</label>
          <input
            type="text"
            placeholder="Type here"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-[#222] text-gray-100 border border-gray-700 rounded-md p-3 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* Description with Quill */}
        <div>
          <label className="block mb-1 text-gray-300">Blog Description</label>
          <div
            ref={quillRef}
            className="bg-white text-black border rounded-md min-h-[200px]"
          />
          <button
            onClick={handleGenerateAI}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md transition"
          >
            Generate with AI
          </button>
        </div>

        {/* Category buttons */}
        <div>
          <label className="block mb-2 text-gray-300">Blog category</label>
          <div className="flex space-x-8 bg-[#121212] p-3 rounded-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-base transition ${
                  category === cat
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Publish now */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={publishNow}
            onChange={() => setPublishNow(!publishNow)}
            className="accent-purple-500 w-4 h-4"
          />
          <label>Publish Now</label>
        </div>

        {/* Submit */}
       <button
  onClick={handleSubmit}
  disabled={isAddingBlog}
  className={`w-full py-3 rounded-md transition text-white 
    ${isAddingBlog 
      ? "bg-purple-400 cursor-not-allowed" 
      : "bg-purple-600 hover:bg-purple-700"}`}
>
  {isAddingBlog ? "Adding..." : "Add Blog"}
</button>
      </div>
    </div>
  );
};

export default AddBlog;
