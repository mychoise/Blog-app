import React from 'react'
import BlogAllTitle from './BlogAllTitle'
import BlogCard from './BlogCard'

const BlogList = () => {
 
 
  return (
    <div className=' z-10 bg-[#0D0D0D]  overflow-hidden  pr-15 w-screen'>
      <div className=' overflow-hidden rounded-[30px] bg-[#1A1A1A] w-full h-full ml-5 -mr-15'>
        <div className=' text-[#A0A0A0] h-full p-25 pt-28'>
           <BlogAllTitle />
        </div>

         {/* <h1 className='text-4xl text-amber-50'>Hello world</h1> */}
      </div>
    </div>
  )
}

export default BlogList