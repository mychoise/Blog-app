import Table from '../../components/admin/Table'
import React from 'react'
import { motion } from 'framer-motion';

const ListBlog = () => {
  return (
    <div className='p-9'>

<motion.h1
  className='text-center font-[font2] text-[50px]'
  whileHover={{
    scale: 2,
    color: '#A3CEF1', // Tailwind's indigo-500
    rotate: -3,
  }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  All Blogs
</motion.h1>

        <div className=" mt-4 p-2 overflow-x-auto max-w-5xl border-2  bg-[#242424] text-white rounded-lg shadow">
          <div>
             <Table/>
          </div>
     
      </div>
    </div>
  )
}

export default ListBlog