import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogStore } from "../store/useBlog";
import moment from "moment";


const BlogCard = ({ menu }) => {
  const navigate = useNavigate();

  // Zustand state
  const { Blogs, listBlog, isLoading, error } = useBlogStore();

  // Fetch blogs on component mount
  useEffect(() => {
    listBlog();
  }, [listBlog]);

  // Filter blogs by category
  const filteredBlogs =
    menu === "All" || !menu
      ? Blogs
      : Blogs.filter((item) => item.category === menu);

  if (isLoading) {
    return <div className="text-white">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="overflow-hidden cursor-pointer mt-5 flex gap-3 flex-wrap">
      {filteredBlogs.map((items) => (
        <motion.div
          key={items._id}
          onClick={() => navigate(`/blog/${items._id}`)}
          className="rounded-2xl cursor-pointer h-[57vh] w-[25vw] bg-[#2E2E2E]"
          whileHover={{
            
            boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            rotate:-1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-3 flex flex-col w-[25vw] h-[55vh]">
            <div className=" bg-red-400 w-[23vw] h-[29vh] rounded-2xl overflow-hidden">
              <img
                className="rounded-1xl w-full h-full object-cover"
                src={items.image}
             
              />
            </div>
            <div className="pl-4 pt-2 overflow-hidden">
              <h1 className="text-white mt-2 overflow-hidden font-[font2] text-[27px] leading-8">
                {items.title}
              </h1>
              <div className="mt-2 overflow-hidden flex flex-row">
                <h1 className="font-[font3] text-[14px]">{items.category}</h1>
                <h1 className="font-[font3] text-[14px]">
                  &nbsp;&nbsp;·&nbsp;  {moment(items.createdAt).format("MMMM D, YYYY")}
                </h1>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogCard;
