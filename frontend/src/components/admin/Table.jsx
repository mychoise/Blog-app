import React from 'react'
import { Clock, MessageSquare, Edit2, FileText, X } from "lucide-react";
import { Blog } from '../../constants/constants';
import { useBlogStore } from '../../store/useBlog';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
const Table = () => {

const {allBlogs , listAllBlog , toggle ,Delete} = useBlogStore()


  const BlogDate = new Date(allBlogs.createdAt)
useEffect(() => {
listAllBlog()
toggle
}, [listAllBlog,toggle])



//   {
//     id: 1,
//     title: "The Rise of Artificial Intelligence in Modern Technology",
//     date: "Wed May 28 2025",
//     status: "Published",
//   },
//   { id: 2, title: "Importance of Tourism", date: "Wed May 28 2025", status: "Published" },
//   { id: 3, title: "The New Way of Study", date: "Wed May 28 2025", status: "Published" },
//   { id: 4, title: "Taxes on Luxury Houses", date: "Wed May 28 2025", status: "Published" },
//   {
//     id: 5,
//     title: "Maximizing returns by minimizing resources in your startup",
//     date: "Wed May 28 2025",
//     status: "Published",
//   },
// ];
  return (
    <>
      <table className="min-w-full w-full divide-y h-auto divide-gray-200">
          <thead  className="bg-gray-100 text-black">
            <tr>
              {["#", "BLOG TITLE", "DATE", "STATUS", "ACTIONS"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-semibold  uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allBlogs.map((item,idx) => (
              <tr key={item._id} className=" cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm t">{idx+1}</td>
                <td className="px-6 w-[40vw] py-4 whitespace-nowrap text-sm t">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm tex">{new Date(item.createdAt).toDateString()}
</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                  {item.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <button onClick={()=>{
                    toggle({id:item._id})
                    
                    toast.success(item.status==="published"?"Unpublished the post":"Published the post")

                  }
                    
                    } className=" cursor-pointer px-3 py-1 border border-gray-300 rounded text-sm tex  transition">
                    {item.status==="published"?"Unpublish":"Publish"}
                  </button>
                  <button
                  onClick={()=>{
                    Delete({id:item._id})
                    toast.success("Deleted succesfully")
                  }}
                    aria-label="Delete"
                    className="p-1 rounded-full text-red-600 hover:bg-red-100 transition focus:outline-none flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}

export default Table