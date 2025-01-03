"use client";

import React, { useState } from "react";
import { PostCardProps } from "@/app/types/post";

const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("he-IL", options);
  };

  return (
    <div className="relative">
      {/* כרטיס הפוסט */}
      <div
        className={`post-card bg-gradient-to-r from-[#1230AE] to-[#6C48C5] rounded-lg shadow-lg p-6 max-w-xl mx-auto mb-6 text-[#FFF7F7] ${
          showPostModal ? "filter blur-sm" : ""
        }`}
      >
        <div className="header flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold">{post.title}</h2>
          {/* תאריך יצירת הפוסט */}
          {post.createDate && (
            <p className="text-sm text-[#C68FE6]">
              נוצר בתאריך: {formatDate(post.createDate.toString())}
            </p>
          )}
        </div>

        {/* פרטי הכותב */}
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <a
              href={`/pages/users/${post.userName}`}
              className="text-[#FFF7F7] hover:text-[#C68FE6]"
            >
              {post.userName}
            </a>
          </div>
          <div className="text-sm text-[#FFF7F7]">({post.userDetails?.titles?.join(", ")})</div>
        </div>

        <p className="description text-lg mb-4">{post.description}</p>

        <div className="flex items-center justify-end">
          <a
            href={`/pages/posts/${post._id.toString()}`}
            className="text-lg text-[#FFF7F7] hover:text-[#C68FE6] flex items-center"
          >
            הראה פוסט מלא
            <span className="ml-2">➔</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
