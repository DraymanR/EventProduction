"use client";

import React, { useState } from "react";
import { PostCardProps, Recommendation } from "@/app/types/post";
import {
  addingMyFavoritePost,
  addRecommendation,
} from "@/app/services/post/post"; // ייבוא הפונקציה
import Image from "next/image";

import { Link } from "react-router-dom";
import PostModal from "./PostModel";
import PopUpWindow from "../pop-upWindow";

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
        className={`post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6 ${
          showPostModal ? "filter blur-sm" : ""
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
            className={`ml-2 transform ${showPostModal ? "rotate-180" : ""}`}
          >
            ➔
          </span>
        </div>
      </div>

      {/* מודל להצגת פוסט מלא */}

      {showPostModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-md max-w-xl shadow-lg overflow-y-auto max-h-[80vh]">
          <button onClick={closePostModal} className="text-red-500">
              X
            </button>

            <PostModal post={post} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
