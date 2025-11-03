import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';

import { useBlogStore } from '../store/useBlog';
import Fotter from "../components/Fotter";
import Comments from '../components/Comments';

const Blogs = () => {
  const { id } = useParams();
  const { selectedBlog, getBlogById, isLoading, error } = useBlogStore();

  useEffect(() => {
    getBlogById(id);
  }, [id, getBlogById]);

  if (isLoading) return <h1 className="text-white">Loading...</h1>;
  if (error) return <h1 className="text-red-500">Error: {error}</h1>;
  if (!selectedBlog) return <h1 className="text-white">Blog not found</h1>;

  const data = selectedBlog;

  return (
    <div className='bg-[#0D0D0D] overflow-hidden w-screen min-h-screen text-white'>
      {/* Header */}
      <div className='flex mt-[-15vh] absolute w-full h-full flex-col items-center justify-center'>
        <div className='fixed flex flex-col items-center justify-center'>
          <motion.h1
            whileHover={{
              scale: 1.8,
              rotate: -3,
              transition: { type: 'spring', stiffness: 400, damping: 80 },
            }}
            className='z-100 font-[font4] mt-5 text-black p-2 bg-[#FFB88F] rounded-2xl cursor-pointer'
          >
            {data.author}
          </motion.h1>

          <h1 className='w-[80vw] font-[font2] leading-20 h-auto text-center text-[80px]'>
            {data.title}
          </h1>

          <p className='font-[font5]  text-[20px] text-[#B8B8B8] w-[52vw] pt-7 text-center'>
            {data.summary}
          </p>

          <div className='text-[#606060] font-[font1] mt-6 text-[13px] flex flex-row gap-2'>
            <p>{data.category}</p>
            <p>·</p>
            <p>{moment(data.createdAt).format("MMMM D, YYYY")}</p>
          </div>
        </div>
      </div>

      {/* Blog image and description */}
      <div className='overflow-hidden absolute mt-[100vh] w-full p-5 bg-[#0D0D0D]'>
        <div className='overflow-hidden h-[80vh] rounded-4xl'>
          <img className='w-full h-full object-cover' src={data.image} alt={data.title} />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className='reader overflow-hidden bg-[#1A1A1A] mt-4 pl-80 pb-40 pt-40 pr-70 rounded-4xl text-white font-[font2]'
        />

        {/* Comments & Footer */}
        <Comments blogId={id} />
        <Fotter />
      </div>
    </div>
  );
};

export default Blogs;
