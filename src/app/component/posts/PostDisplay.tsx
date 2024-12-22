// 'use client'
// import React, { useState } from 'react';
// import { PostCardProps, Recommendation } from '@/app/types/user';
// import { addRecommendation } from '@/app/services/post/post';
// import getPostByIndex from '@/app/store/postStore'


// const PostModal: React.FC<{selectIndexPost:number}> = ({ selectIndexPost }) => {
//   const [post, setPost] = useState(getPostByIndex(selectIndexPost));
//   const [showComments, setShowComments] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
//   const [comments, setComments] = useState<Recommendation[]>(post.recommendations || []); // מערך התגובות
//   const [rating, setRating] = useState<number>(0); // משתנה חדש לשמירת הדירוג

//   const toggleComments = () => {
//     setShowComments((prev) => !prev);
//   };

//   const handleStarClick = (starIndex: number) => {
//     setRating(starIndex + 1); // כל כוכב יקבל דירוג בין 1 ל-5
//   };

//   const addComment = async () => {
//     if (!isAuthenticated) {
//       setShowLoginModal(true);
//     } else {
//       try {
//         const newComment = await addRecommendation(post._id, commentText, rating);
//         setComments((prevComments) => [...prevComments, newComment.recommendation]);
//         // עדכון מיידי של התגובות
//         setCommentText(""); // איפוס שדה התגובה
//         setRating(0); // איפוס הדירוג אחרי הוספת התגובה
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     }
//   };

//   const closeLoginModal = () => {
//     setShowLoginModal(false);
//   };

//   const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCommentText(e.target.value);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-3xl">
//         <div className="flex justify-between items-center mb-4">
//           <button
//             onClick={onClose}
//             className="text-lg text-red-500 hover:text-red-700"
//           >
//             ✖
//           </button>
//         </div>
//         <div className="post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
//           <div className="header flex items-center justify-between mb-4">
//             <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
//             <p className="text-sm text-gray-500"> <a href={`/pages/users/${post.userName}`} className="block text-gray-600 hover:text-red-400">{post.userName}</a> </p>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-4">{post.description}</p>

//         <div className="image-gallery mb-4">
//           {post.album?.length > 0 && (
//             <div className="images flex gap-4 overflow-x-auto">
//               {post.album.map((image, index: number) => (
//                 <img
//                   key={index}
//                   src={image.imgUrl}
//                   alt={`image-${index}`}
//                   className="w-32 h-32 object-cover rounded-md"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {post.postId && (
//           <div className="suppliers-list mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">ספקים:</h3>
//             <ul>
//               {post.postId.supplierNameArr?.map((supplier, index) => (
//                 <li key={index} className="text-sm text-gray-600">
//                   <a href={`/pages/users/${supplier}`} className="text-blue-500 hover:underline">
//                     {supplier}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//             <p className="mt-2 text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
//           </div>
//         )}

//         {/* הצגת התגובות */}
//         {showComments && (
//           <div className="comments mt-4">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
//             <ul className="space-y-2">
//               {comments.map((comment: Recommendation, index: number) => (
//                 <li key={index} className="text-sm text-gray-600">
//                   <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
//                 </li>
//               ))}
//             </ul>

//             {/* שדה הוספת תגובה */}
//             <div className="add-comment mt-4">
//               {isAuthenticated ? (
//                 <>
//                   <input
//                     type="text"
//                     value={commentText}
//                     onChange={handleCommentChange}
//                     className="w-full p-2 border rounded-md"
//                     placeholder="הוסף תגובה"
//                   />
//                   <div className="rating mt-2 flex">
//                     {[...Array(5)].map((_, index) => (
//                       <span
//                         key={index}
//                         onClick={() => handleStarClick(index)}
//                         className={`cursor-pointer text-2xl ${rating > index ? "text-yellow-400" : "text-gray-400"}`}
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <button
//                     onClick={addComment}
//                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
//                   >
//                     הוסף תגובה
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setShowLoginModal(true)}
//                   className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
//                 >
//                   התחבר להוספת תגובה
//                 </button>
//               )}
//             </div>
//           </div>)}
//       </div>

//     </div>

//   );
// };

// export default PostModal;


'use client'
import React, { useState } from 'react';
import { PostCardProps, Recommendation } from '@/app/types/user';
import { addRecommendation } from '@/app/services/post/post';
import usePostStore from '@/app/store/postStore';

const PostDisplay: React.FC<{ selectIndexPost: number }> = async ({ selectIndexPost }) => {
  const post = await usePostStore((state) => state.getPostByIndex(selectIndexPost));
console.log("dd",post)
  if (!post) {
    return <div>Loading...</div>;  // אם לא נמצא פוסט
  }
  const [showComments, setShowComments] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
  const [comments, setComments] = useState<Recommendation[]>([]); // מערך התגובות
  const [rating, setRating] = useState<number>(0); // משתנה חדש לשמירת הדירוג


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
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={closeLoginModal}
            className="text-lg text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
        <div className="post-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
          <div className="header flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-sm text-gray-500">
              <a href={`/pages/users/${post.userName}`} className="block text-gray-600 hover:text-red-400">
                {post.userName}
              </a>
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{post.description}</p>

        <div className="image-gallery mb-4">
          {post.album?.length > 0 && (
            <div className="images flex gap-4 overflow-x-auto">
              {post.album.map((image, index: number) => (
                <img
                  key={index}
                  src={image.imgUrl}
                  alt={`image-${index}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {post.postId && (
          <div className="suppliers-list mb-4">
            <h3 className="text-lg font-semibold text-gray-800">ספקים:</h3>
            <ul>
              {post.postId.supplierNameArr?.map((supplier, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <a href={`/pages/users/${supplier}`} className="text-blue-500 hover:underline">
                    {supplier}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default PostDisplay;
