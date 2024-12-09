import React, { useState, useEffect } from 'react';
import { getAllPosts } from '@/app/services/post/post'; // עדכן את הנתיב למיקום הקובץ
// import NewPhoto from '@/app/component/ImageUploader'
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await getAllPosts(page, 10); // העברת פרמטרים של דף ומספר פריטים
                setPosts(data.posts);
            } catch (err) {
                setError('Failed to fetch posts. Please try again later.');
            }
        };

        getPosts();
    }, [page]); // ייבוא הפוסטים מחדש בעת שינוי הדף

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

    if (error) {
        return <div className="text-red-600 font-bold text-center mt-4">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">

            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Posts</h1>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div key={post._id}>
                        <li
                            key={post._id}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-300"
                        >
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-sm text-gray-600 mb-4">{post.description}</p>
                            <small className="block text-gray-500 text-xs">Created by: {post.userName}</small>
                        </li>
                        {/* <NewPhoto postId={post._id} /> */}
                    </div>
                ))}
            </ul>
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg font-semibold text-white ${page === 1
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 transition'
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PostList;
