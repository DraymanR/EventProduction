'use client'
import React, { useState, useEffect } from 'react';
import { getAllPosts } from '@/app/services/post/post'; // עדכן את הנתיב למיקום הקובץ
import PostCard from './PostCard';
import { PostCardProps } from "@/app/types/user";
// הגדרת טיפ לפוסט

const PostList = () => {
    const [posts, setPosts] = useState<PostCardProps[]>([]); // הגדרת state עם טיפ
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false); // מצב טעינה

    const loadPosts = async () => {
        if (loading) return; // אם אנחנו כבר טוענים, לא נבצע טעינה נוספת

        setLoading(true); // נעדכן את מצב הטעינה
        try {
            const data = await getAllPosts(page, 10); // העברת פרמטרים של דף ומספר פריטים
            setPosts((prevPosts) => [...prevPosts, ...data.posts]); // הוספת פוסטים חדשים לרשימה הקיימת
            setPage((prevPage) => prevPage + 1); // הגדלת הדף
        } catch (err) {
            setError('Failed to fetch posts. Please try again later.');
        } finally {
            setLoading(false); // נשחרר את מצב הטעינה
        }
    };

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY === document.documentElement.scrollHeight;
        if (bottom) {
            loadPosts(); // אם הגענו לתחתית, נטעין עוד פוסטים
        }
    };

    useEffect(() => {
        // הוספת מאזין גלילה לחלון, במקום להאזין רק ל-container
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // הסרת המאזין
        };
    }, [loading]);

    useEffect(() => {
        loadPosts();
    }, []); // טעינה של הפוסטים רק פעם אחת

    if (error) {
        return <div className="text-red-600 font-bold text-center mt-4">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">פוסטים</h1>

            <div className="space-y-6">  {/* לכל פוסט יש שורה משלו */}
                {posts.map((post:PostCardProps, index:number) => (
                    <PostCard key={index} post={post} />
                ))}
            </div>

            {loading && (
                <div className="text-center py-4 animate-pulse text-gray-500">טוען...</div>
            )}
        </div>

    );

};

export default PostList;