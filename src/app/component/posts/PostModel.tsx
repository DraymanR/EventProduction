// import React, { useState } from 'react';
// import Link from 'next/link';
// import { FaHeart, FaRegHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { PostCardProps } from '@/app/types/user';
// import { Recommendation } from '@/app/types/post';
// import useUserStore from '@/app/store/userModel';
// import { addPostToFavorites, removePostToFavorites } from '@/app/services/user/post';
// import { addRecommendation } from '@/app/services/post/post';

// const PostView: React.FC<{ post: PostCardProps }> = ({ post }) => {
//   const { likedPostsArr, setLikedPostsArr } = useUserStore();
//   const userNameFromCookie = decodeURIComponent(document.cookie);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
//   const [comments, setComments] = useState<Recommendation[]>(post.recommendations || []);
//   const [rating, setRating] = useState<number>(0); // משתנה חדש לשמירת הדירוג
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [isFavorite, setIsFavorite] = useState(
//     likedPostsArr.some((favoritePost) => favoritePost._id === post._id)
//   );
//   const [showAddComment, setShowAddComment] = useState(false); // מצב עבור פתיחה/סגירה של שדה הוספת תגובה

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

//   // פונקציה להוספה או הסרה של פוסט ממועדפים
//   const toggleFavorite = async () => {
//     if (isFavorite) {
//       // אם הפוסט במועדפים - נסיר אותו
//       await removePostToFavorites(post._id);
//       setLikedPostsArr(likedPostsArr.filter((favoritePost) => favoritePost._id !== post._id)); // מסנן את הפוסט מהמועדפים
//       setIsFavorite(false); // עדכון המשתנה המקומי ל- false
//     } else {
//       // אם הפוסט לא במועדפים - נוסיף אותו
//       await addPostToFavorites(post._id);
//       setLikedPostsArr([...likedPostsArr, post]); // מוסיף את הפוסט למועדפים
//       setIsFavorite(true); // עדכון המשתנה המקומי ל- true
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('he-IL', options);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         {/* כותרת הפוסט */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

//         {/* תאריך יצירת הפוסט */}
//         {post.createDate && (
//           <p className="text-sm text-gray-500 mb-4">
//             נוצר בתאריך: {formatDate(post.createDate.toString())}
//           </p>
//         )}

//         {/* פרטי הכותב */}
//         <div className="flex items-center mb-4">
//           <div className="mr-4">
//             <Link
//               href={`/pages/users/${post.userName}`}
//               className="text-blue-500 hover:underline"
//             >
//               {post.userName}
//             </Link>
//           </div>
//           <div className="text-sm text-gray-500">({post.userDetails?.titles?.join(', ')})</div>
//         </div>

//         {/* תיאור */}
//         <p className="text-gray-700 mb-6">{post.description}</p>

//         {/* גלריית תמונות */}
//         {post.album?.length > 0 && (
//           <div className="image-gallery mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">תמונות:</h2>
//             <div className="flex gap-4 overflow-x-auto">
//               {post.album.map((image, index) => (
//                 <img
//                   src={image}
//                   key={index}
//                   alt={`image-${index}`}
//                   className="w-32 h-32 object-cover rounded-md"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* פרטי פוסט של צרכן */}
//         {post.postId && (
//           <div className="consumer-details mb-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">פרטי הפוסט:</h2>
//             <p className="text-sm text-gray-600">קטגוריה: {post.postId.eventCategory}</p>
//             <p className="text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
//             <h3 className="text-md font-semibold text-gray-800 mt-4">ספקים:</h3>
//             <ul>
//               {post.postId.supplierNameArr?.map((supplier: string, index: number) => (
//                 <li key={index} className="text-sm text-gray-600">
//                   <Link href={`/pages/users/${supplier}`} className="text-blue-500 hover:underline">
//                     {supplier}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* תגובות */}
//         <div className="comments mb-6">
//           <h2 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h2>
//           <button
//             onClick={() => setShowComments((prev) => !prev)}
//             className="text-blue-500 flex items-center gap-2 mb-4"
//           >
//             {showComments ? (
//               <>
//                 <FaChevronUp /> סגור תגובות
//               </>
//             ) : (
//               <>
//                 <FaChevronDown /> הצג תגובות
//               </>
//             )}
//           </button>
//           {showComments && (
//             <ul className="space-y-4 mt-4">
//               {comments.length > 0 ? (
//                 comments.map((comment, index) => (
//                   <li key={index} className="border-b pb-2">
//                     <div className="flex items-center gap-2">
//                       <Link href={`/pages/users/${comment.userName}`} className="text-blue-500 hover:underline">
//                         {comment.userName}
//                       </Link>
//                       <span className="text-sm text-gray-500">⭐ {comment.rate}/5</span>
//                     </div>
//                     <p className="text-gray-700 mt-1">{comment.text}</p>
//                   </li>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500">אין תגובות עדיין.</p>
//               )}
//             </ul>
//           )}

//           {/* כפתור הוספת תגובה */}
//           <button
//             onClick={() => setShowAddComment((prev) => !prev)}
//             className="mt-4 text-blue-500 flex items-center gap-2"
//           >
//             {showAddComment ? (
//               <FaChevronUp /> // אם התגובה פתוחה, החץ למעלה
//             ) : (
//               <FaChevronDown /> // אם התגובה סגורה, החץ למטה
//             )}
//             הוסף תגובה
//           </button>

//           {/* שדה הוספת תגובה */}
//           {showAddComment && (
//             <div className="add-comment mt-4">
//               {isAuthenticated ? (
//                 <>
//                   <div className="flex items-center gap-2 mb-4">
//                     <input
//                       type="text"
//                       value={commentText}
//                       onChange={handleCommentChange}
//                       className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="הוסף תגובה"
//                     />
//                     <div className="rating flex gap-1">
//                       {[...Array(5)].map((_, index) => (
//                         <span
//                           key={index}
//                           onClick={() => handleStarClick(index)}
//                           className={`cursor-pointer text-2xl ${rating > index ? "text-yellow-400" : "text-gray-400"}`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <button
//                     onClick={addComment}
//                     className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
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
//           )}
//         </div>

//         {/* כפתור מועדפים */}
//         {userNameFromCookie && <div className="favorite mt-6">
//           <button onClick={toggleFavorite} className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`}>
//             {isFavorite ? <FaHeart /> : <FaRegHeart />}
//           </button>
//         </div>}
//       </div>
//     </div>
//   );
// };

// export default PostView;
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PostCardProps } from '@/app/types/user';
import { Recommendation } from '@/app/types/post';
import useUserStore from '@/app/store/userModel';
import { addPostToFavorites, removePostToFavorites } from '@/app/services/user/post';
import { addRecommendation } from '@/app/services/post/post';
import ImageGallery from '@/app/component/posts/ImageGallry'; // ייבוא קומפוננטת הגלריה

const PostView: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const { likedPostsArr, setLikedPostsArr } = useUserStore();
  const userNameFromCookie = decodeURIComponent(document.cookie);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
  const [comments, setComments] = useState<Recommendation[]>(post.recommendations || []);
  const [rating, setRating] = useState<number>(0); // משתנה חדש לשמירת הדירוג
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isFavorite, setIsFavorite] = useState(
    likedPostsArr.some((favoritePost) => favoritePost._id === post._id)
  );
  const [showAddComment, setShowAddComment] = useState(false); // מצב עבור פתיחה/סגירה של שדה הוספת תגובה

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

  // פונקציה להוספה או הסרה של פוסט ממועדפים
  const toggleFavorite = async () => {
    if (isFavorite) {
      // אם הפוסט במועדפים - נסיר אותו
      await removePostToFavorites(post._id);
      setLikedPostsArr(likedPostsArr.filter((favoritePost) => favoritePost._id !== post._id)); // מסנן את הפוסט מהמועדפים
      setIsFavorite(false); // עדכון המשתנה המקומי ל- false
    } else {
      // אם הפוסט לא במועדפים - נוסיף אותו
      await addPostToFavorites(post._id);
      setLikedPostsArr([...likedPostsArr, post]); // מוסיף את הפוסט למועדפים
      setIsFavorite(true); // עדכון המשתנה המקומי ל- true
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* כותרת הפוסט */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

        {/* תאריך יצירת הפוסט */}
        {post.createDate && (
          <p className="text-sm text-gray-500 mb-4">
            נוצר בתאריך: {formatDate(post.createDate.toString())}
          </p>
        )}

        {/* פרטי הכותב */}
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Link
              href={`/pages/users/${post.userName}`}
              className="text-blue-500 hover:underline"
            >
              {post.userName}
            </Link>
          </div>
          <div className="text-sm text-gray-500">({post.userDetails?.titles?.join(', ')})</div>
        </div>

        {/* תיאור */}
        <p className="text-gray-700 mb-6">{post.description}</p>

        {/* גלריית תמונות */}
        {post.album?.length > 0 && <ImageGallery images={post.album} />}

        {/* פרטי פוסט של צרכן */}
        {post.postId && (
          <div className="consumer-details mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">פרטי הפוסט:</h2>
            <p className="text-sm text-gray-600">קטגוריה: {post.postId.eventCategory}</p>
            <p className="text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
            <h3 className="text-md font-semibold text-gray-800 mt-4">ספקים:</h3>
            <ul>
              {post.postId.supplierNameArr?.map((supplier: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">
                  <Link href={`/pages/users/${supplier}`} className="text-blue-500 hover:underline">
                    {supplier}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* תגובות */}
        <div className="comments mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h2>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="text-blue-500 flex items-center gap-2 mb-4"
          >
            {showComments ? (
              <FaChevronUp /> // הצג או סגור תגובות
            ) : (
              <FaChevronDown /> 
            )}
          </button>
          {showComments && (
            <ul className="space-y-4 mt-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Link href={`/pages/users/${comment.userName}`} className="text-blue-500 hover:underline">
                        {comment.userName}
                      </Link>
                      <span className="text-sm text-gray-500">⭐ {comment.rate}/5</span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">אין תגובות עדיין.</p>
              )}
            </ul>
          )}

          {/* כפתור הוספת תגובה */}
          <button
            onClick={() => setShowAddComment((prev) => !prev)}
            className="mt-4 text-blue-500 flex items-center gap-2"
          >
            {showAddComment ? (
              <FaChevronUp /> // אם התגובה פתוחה, החץ למעלה
            ) : (
              <FaChevronDown /> // אם התגובה סגורה, החץ למטה
            )}
            הוסף תגובה
          </button>

          {/* שדה הוספת תגובה */}
          {showAddComment && (
            <div className="add-comment mt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="text"
                      value={commentText}
                      onChange={handleCommentChange}
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="הוסף תגובה"
                    />
                    <div className="rating flex gap-1">
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
                  </div>
                  <button
                    onClick={addComment}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    שלח תגובה
                  </button>
                </>
              ) : (
                <p>יש להתחבר כדי להוסיף תגובה.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostView;
