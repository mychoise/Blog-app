import React, { useState } from 'react';
import { BlogListShowing } from '../constants/constants';
import { motion } from "framer-motion";
import BlogCard from './BlogCard';

const BlogAllTitle = () => {
  const [menu, setmenu] = useState(1);

  // Find the selected category name based on ID
  const selectedCategory =
    menu === 1 ? "All" : BlogListShowing.find(item => item.id === menu)?.title;

  return (
    <>
      <div className='flex overflow-hidden gap-0.5 font-[font4]'>
        {BlogListShowing.map((items) => (
          <motion.div
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`pr-4 cursor-pointer pl-4 pt-2 pb-2 overflow-hidden ${
              menu === items.id && 'bg-[#2E2E2E] rounded-[30px] text-[#FFFFFF]'
            }`}
            key={items.id}
            onClick={() => setmenu(items.id)}
          >
            {items.title}
          </motion.div>
        ))}
      </div>
      <BlogCard menu={selectedCategory} />
    </>
  );
};

export default BlogAllTitle;