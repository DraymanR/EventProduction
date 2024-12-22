import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostCardProps } from '@/app/types/user';

const PostModal: React.FC<{ post: PostCardProps; onClose: () => void }> = ({ post, onClose }) => {
  const isFavorite = true; // יש להחליף במידע אמיתי האם זה פוסט מעודף
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-lg text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>

        {/* פרטי הכותב */}
        <p className="text-sm text-gray-500 mb-4">
          מאת{' '}
          <Link href={`/pages/users/${post.userName}`} className="text-blue-500 hover:underline">
            {post.userName}
          </Link>{' '}
          ({post.userDetails?.titles?.join(', ')})
        </p>

        {/* תיאור */}
        <p className="text-gray-700 mb-4">{post.description}</p>

        {/* גלריית תמונות */}
        {post.album?.length > 0 && (
          <div className="image-gallery mb-4">
            <h3 className="text-lg font-semibold text-gray-800">תמונות:</h3>
            <div className="images flex gap-4 overflow-x-auto">
              {post.album.map((image, index) => (
                <img
                  key={index}
                  src={image.imgUrl}
                  alt={`image-${index}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}

        {/* פרטי פוסט של צרכן */}
        {post.postId && (
          <div className="consumer-details mb-4">
            <h3 className="text-lg font-semibold text-gray-800">פרטי הפוסט:</h3>
            <p className="text-sm text-gray-600">קטגוריה: {post.postId.eventCategory}</p>
            <p className="text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
            <h4 className="text-md font-semibold text-gray-800 mt-2">ספקים:</h4>
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
        <div className="comments mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
          <ul className="space-y-2">
            {post.recommendations?.length > 0 ? (
              post.recommendations.map((comment, index) => (
                <li key={index} className="text-sm text-gray-600">
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
        <div className="favorite mt-4">
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

export default PostModal;
