// "use client";

// import React, { useState } from "react";
// import { PostCardProps, Recommendation } from "@/app/types/user";
// const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {

//   const [showComments, setShowComments] = useState(false);
//   const [images, setImages] = useState<string[]>(post.album || []);


//   const toggleComments = () => {
//     setShowComments((prev) => !prev);
//   };

//   return (
//     <div className="post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
//       <div className="header flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
//         <p className="text-sm text-gray-500">מאת {post.userName}</p>
//       </div>

//       <p className="description text-gray-700 mb-4">{post.description}</p>

//       {/* אלבום תמונות */}
//       <div className="image-gallery mb-4">
//         {images.length > 0 && (
//           <div className="images flex gap-4 overflow-x-auto">
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`image-${index}`}
//                 className="w-32 h-32 object-cover rounded-md"
//               />
//             ))}
//           </div>
//         )}
//       </div>


//       <div className="comments-toggle flex items-center text-blue-500 cursor-pointer" onClick={toggleComments}>
//         <span>{showComments ? "הסתר תגובות" : "הראה תגובות"}</span>
//         <span className={`ml-2 transform ${showComments ? "rotate-180" : ""}`}>
//           ➔ {/* חץ */}
//         </span>
//       </div>


//       {showComments && (
//         <div className="comments mt-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
//           <ul className="space-y-2">
//             {post.recommendations.map((comment: Recommendation, index: number) => (
//               <li key={index} className="text-sm text-gray-600">
//                 <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;
'use client'
import React, { useState } from "react";
import { PostCardProps, Recommendation } from "@/app/types/user";
import { addingMyFavoritePost, addRecommendation } from "@/app/services/post/post"; // ייבוא הפונקציה
import Image from "next/image";

import { Link } from "react-router-dom";


const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [images, setImages] = useState<string[]>(post.album || []);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
  const [comments, setComments] = useState<Recommendation[]>(post.recommendations || []); // מערך התגובות
  const [rating, setRating] = useState<number>(0); // משתנה חדש לשמירת הדירוג
  const [isFavorite, setIsFavorite] = useState(false); // מצב הלב
  const [showPostModal, setShowPostModal] = useState(false);
  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
    addingMyFavoritePost(post._id); // קריאה לפונקציה
  };
  const openPostModal = () => {
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1); // כל כוכב יקבל דירוג בין 1 ל-5
  };

  const addComment = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      try {
        const newComment = await addRecommendation(post._id, commentText, rating);
        setComments((prevComments) => [...prevComments, newComment.recommendation]);
        // עדכון מיידי של התגובות
        setCommentText(""); // איפוס שדה התגובה
        setRating(0); // איפוס הדירוג אחרי הוספת התגובה
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
      <div className="header flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
        <p className="text-sm text-gray-500"> <a href={`/pages/users/${post.userName}`} className="block text-gray-600 hover:text-red-400">{post.userName}</a> </p>
      </div>
      <div className="favorite-toggle mb-4">
        <span
          onClick={handleFavoriteClick}
          className={`cursor-pointer text-3xl ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
        >
          ♥
        </span>
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
        <span className={`ml-2 transform ${showComments ? "rotate-180" : ""}`}>➔</span>
      </div>

      {/* הצגת התגובות */}
      {showComments && (
        <div className="comments mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
          <ul className="space-y-2">
            {comments.map((comment: Recommendation, index: number) => (
              <li key={index} className="text-sm text-gray-600">
                <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
              </li>
            ))}
          </ul>

          {/* שדה הוספת תגובה */}
          <div className="add-comment mt-4">
            {isAuthenticated ? (
              <>
                <input
                  type="text"
                  value={commentText}
                  onChange={handleCommentChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="הוסף תגובה"
                />
                <div className="rating mt-2 flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className={`cursor-pointer text-2xl ${rating > index ? "text-yellow-400" : "text-gray-400"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <button
                  onClick={addComment}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  הוסף תגובה
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                התחבר להוספת תגובה
              </button>
            )}
            
          </div>
        </div>
      )}

      {/* מודל כניסה */}
      {showLoginModal && (
        <div className="login-modal fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">התחבר כדי להוסיף תגובה</h2>
            <button onClick={closeLoginModal} className="px-4 py-2 bg-red-500 text-white rounded-md">
              סגור
            </button>
          </div>
        </div>
        
      )}
       <button
        onClick={openPostModal}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        הראה פוסט מלא
      </button>
    </div>
  );
};

export default PostCard;
