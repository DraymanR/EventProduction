"use client";

import React, { useState } from "react";
import { PostCardProps } from "@/app/types/post";
import PostModal from "./PostModel";

const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const openPostModal = () => {
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  return (
    <div className="relative">
      {/* כרטיס הפוסט */}
      <div
        className={`post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6 ${showPostModal ? "filter blur-sm" : ""
          }`}
      >
        <div className="header flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          {/* תאריך יצירת הפוסט */}
          {post.createDate && (
            <p className="text-sm text-gray-500 mb-4">
              נוצר בתאריך: {formatDate(post.createDate.toString())}
            </p>
          )}

          {/* פרטי הכותב */}
          <div className="flex items-center mb-4">
            <div className="mr-4">
              <a href={`/pages/users/${post.userName}`} className="text-gray-600 hover:text-red-400">
                {post.userName}
              </a>
            </div>
            <div className="text-sm text-gray-500">({post.userDetails?.titles?.join(', ')})</div>
          </div>
        </div>
        <p className="description text-gray-700 mb-4">{post.description}</p>

        <div
          className="comments-toggle flex items-center text-blue-500 cursor-pointer"
          onClick={openPostModal}
        >
          <span> הראה פוסט מלא</span>
          <span
          >
             <a href={`/pages/posts/${post._id.toString()}`} className="text-blue-500 hover:underline">
              {post.title}
            </a>
            ➔
          </span>
        </div>
      </div>

   
    </div>
  );
};

export default PostCard;
