import React from 'react';
import { PostCardProps } from '@/app/types/user';
import Image from 'next/image';

interface PostModalProps {
  post: PostCardProps;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-lg text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">מאת {post.userName}</p>
        <p className="text-gray-700 mb-4">{post.description}</p>

        <div className="image-gallery mb-4">
          {post.album?.length > 0 && (
            <div className="images flex gap-4 overflow-x-auto">
              {post.album.map((image, index) => (
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

        {post.postId  && (
          <div className="suppliers-list mb-4">
            <h3 className="text-lg font-semibold text-gray-800">ספקים:</h3>
            <ul>
              {post.postId.supplierNameArr?.map((supplier, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <a href={`/supplier/${supplier}`} className="text-blue-500 hover:underline">
                    {supplier}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-600">תקציב: {post.postId.budget} ₪</p>
          </div>
        )}

        <div className="comments mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">תגובות והמלצות</h3>
          <ul className="space-y-2">
            {post.recommendations?.map((comment, index) => (
              <li key={index} className="text-sm text-gray-600">
                <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

