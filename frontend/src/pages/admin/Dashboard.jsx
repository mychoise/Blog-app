import React, { useEffect } from "react";
import { Clock, MessageSquare, FileText } from "lucide-react";
import Table from "../../components/admin/Table";
import { useCommentStore } from "../../store/useComment";
import { useBlogStore } from "../../store/useBlog";

export default function BlogDashboard() {
  // Subscribe to Zustand stores
  const Allcomments = useCommentStore((state) => state.Allcomments);
  const listAllComments = useCommentStore((state) => state.listAllComments);

  const allBlogs = useBlogStore((state) => state.allBlogs);
  const listAllBlog = useBlogStore((state) => state.listAllBlog);

  // Fetch data on mount
  useEffect(() => {
    listAllComments(); // fetch all comments
    listAllBlog();     // fetch all blogs
  }, []);

  const summaryData = [
    { icon: Clock, number: allBlogs.length, label: "Blogs", bgColor: "bg-yellow-300" },
    { icon: MessageSquare, number: Allcomments.length, label: "Comments", bgColor: "bg-green-300" },
  ];

  return (
    <div className="font-[font3] bg-[#1A1A1A] rounded-4xl mt-8 p-6">
      {/* Summary Cards */}
      <div className="flex gap-6 mb-8 max-w-5xl mx-auto">
        {summaryData.map(({ icon: Icon, number, label, bgColor }) => (
          <div
            key={label}
            className={`flex items-center gap-4 ${bgColor} px-6 py-4 rounded-lg shadow-md w-64`}
          >
            <div className="bg-indigo-100 p-3 rounded-md">
              <Icon className="text-indigo-600 w-7 h-7" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{number}</p>
              <p className="text-gray-600">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Blogs Header */}
      <div className="flex items-center text-white gap-2 max-w-5xl mx-auto mb-4 font-semibold text-lg">
        <FileText className="w-5 h-5 text-indigo-600" />
        <span>Latest Blogs</span>
      </div>

      {/* Blogs Table */}
      <div className="overflow-x-auto max-w-5xl border-2  bg-[#242424] text-white rounded-lg shadow">
        <Table /> {/* Make sure Table subscribes to Zustand store */}
      </div>
    </div>
  );
}
