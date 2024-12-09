"use client";

import React, { useState } from "react";
import { PostCardProps, Recommendation } from "@/app/types/user";
const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {

  const [showComments, setShowComments] = useState(false);
  const [images, setImages] = useState<string[]>(post.album || []);


  // פונקציה לפתיחת/סגירת התגובות
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
      <div className="header flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
        <p className="text-sm text-gray-500">מאת {post.userName}</p>
      </div>

      <p className="description text-gray-700 mb-4">{post.description}</p>

      {/* אלבום תמונות */}
      <div className="image-gallery mb-4">
        {images.length > 0 && (
          <div className="images flex gap-4 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image-${index}`}
                className="w-32 h-32 object-cover rounded-md"
              />
            ))}
          </div>
        )}
      </div>

      {/* כפתור לפתיחת התגובות */}
      <div className="comments-toggle flex items-center text-blue-500 cursor-pointer" onClick={toggleComments}>
        <span>{showComments ? "הסתר תגובות" : "הראה תגובות"}</span>
        <span className={`ml-2 transform ${showComments ? "rotate-180" : ""}`}>
          ➔ {/* חץ */}
        </span>
      </div>

      {/* הצגת התגובות */}
      {showComments && (
        <div className="comments mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
          <ul className="space-y-2">
            {post.recommendations.map((comment: Recommendation, index: number) => (
              <li key={index} className="text-sm text-gray-600">
                <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostCard;
