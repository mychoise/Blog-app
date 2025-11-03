import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useCommentStore } from "../../store/useComment"; // adjust path if needed

const Comments = () => {
  const [filter, setFilter] = useState("approved");
  const { Allcomments, comments, listAllComments ,listComments , togglecomment , deleteComment } = useCommentStore();

  useEffect(() => {
    listAllComments()
  }, [listAllComments])
  

  const handleDelete = (id) => {
    deleteComment(id)
  };

  const filteredComments =
    filter === "approved"
      ? Allcomments.filter((c) => c.isApproved)
      : Allcomments.filter((c) => !c.isApproved);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="p-6 font-[font3]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-1 rounded-full border text-sm ${
              filter === "approved"
                ? "border-purple-500 text-purple-600 bg-purple-50"
                : "border-gray-300 text-white"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("notApproved")}
            className={`px-4 py-1 rounded-full border text-sm ${
              filter === "notApproved"
                ? "border-purple-500 text-purple-600 bg-purple-50"
                : "border-gray-300 text-white"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="bg-[#1A1A1A] shadow-sm rounded-xl border border-gray-200">
        <div className="grid grid-cols-3 p-4 border-b font-semibold text-white">
          <p>BLOG TITLE & COMMENT</p>
          <p className="text-center">DATE</p>
          <p className="text-center">ACTION</p>
        </div>

        {filteredComments.length === 0 ? (
          <p className="p-6 text-white text-center">
            No {filter === "approved" ? "approved" : "unapproved"} comments.
          </p>
        ) : (
          filteredComments.map((c) => (
            <div
              key={c._id}
              className="grid grid-cols-3 p-5 border-b last:border-none text-white"
            >
              <div>
                <p>
                  <span className="font-semibold">Blog : </span>
                  {c.blog?.title || "Untitled Blog"}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Name : </span>
                  {c.name}
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Comment : </span>
                  {c.comment}
                </p>
              </div>

              <div className="flex items-center justify-center text-white">
                {formatDate(c.createdAt)}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
onClick={()=>{togglecomment({id:c._id,approved:c.isApproved})
console.log(c.isApproved)
}}
                  className={`text-sm px-4 py-1 rounded-full  cursor-pointer  ${
                    c.isApproved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {c.isApproved ? "Approved" : "Not Approved"}
                </button>
                <Trash2
                  size={18}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                  onClick={() => handleDelete(c._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
