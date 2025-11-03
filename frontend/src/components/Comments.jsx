import React, { useEffect, useState } from "react";
import moment from "moment";
import { useCommentStore } from "../store/useComment";

const Comments = ({ blogId }) => {
  const {
    addComments,
    listComments,
    comments,
    isAddingComment,
    isLoadingComment,
  } = useCommentStore();

    const [filter, setFilter] = useState("approved"); // 'approved' or 'notApproved'



const filteredComment = comments.filter(comment => comment.isApproved === true);

  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    listComments(blogId);
  }, [blogId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "" || name.trim() === "") return;
    await addComments(blogId, name, newComment);
    await listComments(blogId); 
    setNewComment("");
    setName("");
  };

  return (
    <div className="mt-5 bg-[#0D0D0D]">
      <div className="rounded-4xl p-10 bg-[#1A1A1A]">
        <h1 className="text-4xl font-[font2] mb-6">
          Comments ({filteredComment?.length || 0})
        </h1>

        {/* Add Comment Section */}
        <div className="flex flex-col gap-4 mb-8 bg-[#2E2E2E] p-5 rounded-2xl">
          <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"
                alt="User avatar"
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="flex-1 bg-[#1A1A1A] text-white rounded-lg px-4 py-2 outline-none placeholder-gray-400 font-[font3]"
            />
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            className="w-full bg-[#1A1A1A] text-white rounded-lg px-4 py-3 outline-none resize-none placeholder-gray-400 font-[font4]"
          ></textarea>

          <div className="flex justify-end">
            <button
              onClick={handleAddComment}
              disabled={isAddingComment}
              className="bg-[#3A3A3A] hover:bg-[#505050] text-white px-5 py-2 rounded-lg transition-all"
            >
              {isAddingComment ? "Posting..." : "Post"}
            </button>
          </div>
        </div>

        {/* Comment List */}
        {isLoadingComment ? (
          <p className="text-white">Loading comments...</p>
        ) : (
          filteredComment.map((item) => (
            <div
              key={item._id}
              className="w-full flex gap-4 p-4 rounded-xl hover:bg-[#242424] transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://www.citypng.com/public/uploads/preview/white-user-member-guest-icon-png-image-701751695037005zdurfaim0y.png"
                  alt="User avatar"
                />
              </div>

              <div className="bg-[#2E2E2E] w-[30vw] flex flex-col justify-center p-3 rounded-xl">
                <h2 className="font-semibold text-lg font-[font1]">
                  {item.name}
                </h2>
                <div className="flex justify-between items-center w-full mt-2">
                  <p className="font-[font4] w-[16vw]">{item.comment}</p>
                  <p className="text-sm w-35 text-white font-[font3]">
                    {moment(item.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
