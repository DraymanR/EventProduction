'use client';

import React, { useState } from "react";
import { PostCardProps, Recommendation } from "@/app/types/user";
import { addingMyFavoritePost, addRecommendation } from "@/app/services/post/post"; // ייבוא הפונקציה
import Image from "next/image";

import { Link } from "react-router-dom";
import PostModal from "./PostModel";


const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const openPostModal = () => {
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
  };

  return (
    <div className="relative">
      {/* כרטיס הפוסט */}
      <div className={`post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6 ${showPostModal ? "filter blur-sm" : ""}`}>
        <div className="header flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
    
          <p className="text-sm text-gray-500">
            <a href={`/pages/users/${post.userName}`} className="text-gray-600 hover:text-red-400">
              {post.userName}
            </a>
          </p>
        </div>
        <p className="description text-gray-700 mb-4">{post.description}</p>

        <div className="comments-toggle flex items-center text-blue-500 cursor-pointer" onClick={openPostModal}>
          <span> הראה פוסט מלא</span>
          <span className={`ml-2 transform ${showPostModal ? "rotate-180" : ""}`}>➔</span>
        </div>
      </div>

      {/* מודל להצגת פוסט מלא */}
      {showPostModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-md max-w-xl shadow-lg overflow-y-auto max-h-[80vh]">
            <PostModal post={post} />
            {/* //onClose={closePostModal} /> */}

            {/* כפתור סגירה */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
