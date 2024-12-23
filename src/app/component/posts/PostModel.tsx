import React from 'react';
import Link from 'next/link';
import { PostCardProps } from '@/app/types/user';

const PostView: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const isFavorite = true; // יש להחליף במידע אמיתי האם זה פוסט מעודף

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* כותרת הפוסט */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

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
        {post.album?.length > 0 && (
          <div className="image-gallery mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">תמונות:</h2>
            <div className="flex gap-4 overflow-x-auto">
              {post.album.map((image, index) => (
                <img
                  key={index}
                  // src={image.imgUrl}
                  alt={`image-${index}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

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
          <ul className="space-y-4">
            {post.recommendations?.length > 0 ? (
              post.recommendations.map((comment, index) => (
                <li key={index} className="border-b pb-2">
                  <Link href={`/pages/users/${comment.userName}`} className="text-blue-500 hover:underline">
                    {comment.userName}
                  </Link>
                  : {comment.text} ⭐{comment.rate}/5
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">אין תגובות עדיין.</p>
            )}
          </ul>
        </div>

        {/* כפתור מועדפים */}
        <div className="favorite mt-6">
          <button
            className={`px-4 py-2 rounded-md ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostView;
