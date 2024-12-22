import React, { useEffect, useState } from 'react';
import { getUserDetails } from "@/app/services/user/getDetails";
import { Post, PostCardProps, Recommendation, UserResponseData } from '@/app/types/user';
import PostCard from '../posts/PostCard';
import { mapPostToPostCardProps } from '@/app/services/post/post';

const ShowUser = ({ userName }: { userName: string }) => {
    const [user, setUser] = useState<UserResponseData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false); // האם המשתמש הוא חלק מרשימת האהובים
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // האם המשתמש מחובר
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetails = await getUserDetails(userName);
                console.log("Fetched User:", userDetails);
                setUser(userDetails.user); // שומר את המידע ב-state
                setError(null); // מנקה שגיאות אם יש
            } catch (err: any) {
                setError("שגיאה בטעינת פרטי המשתמש");
                console.error(err);
            }
        };

        const checkIfLoggedIn = () => {
            if (typeof window !== 'undefined') {
                const cookies = document.cookie.split('; ');
                const usernameCookie = cookies.find(row => row.startsWith('userName='));
                if (usernameCookie) {
                    setIsLoggedIn(true);
                    const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
                    setLoggedInUser(myUserName)
                    console.log('Username from cookie:', myUserName);
                }
            }
        };

        fetchUser();
        checkIfLoggedIn();
    }, [userName]);

    useEffect(() => {
        // בדוק אם המשתמש שמוצג נמצא ברשימת האהובים של המשתמש המחובר
        //
        //
        if (isLoggedIn && user) {

        }
    }, [isLoggedIn, user]);

    const toggleFavorite = () => {
        // עדכון הרשימה אם המשתמש אהב או הסיר ספק
        //
        //
        setIsFavorite(!isFavorite);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>טוען...</div>;
    }

    return (
        <div className="user-details p-6 bg-gray-100 shadow-lg rounded-lg" dir="rtl">
            <h1 className="text-2xl font-bold mb-4 text-right">פרטי משתמש - {user.userName}</h1>

            <div className="flex items-center space-x-4 mb-4">
                {user.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt="תמונת פרופיל"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                )}
                <div className="text-right">
                    <p><strong>שם מלא:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>אימייל:</strong> {user.email}</p>
                    <p><strong>טלפון:</strong> {user.phone}</p>
                    <p><strong>תיאור:</strong> {user.description}</p>
                    <p><strong>שפות:</strong> {user.languages.length > 0 ? user.languages.join(", ") : "אין שפות זמינות"}</p>
                </div>
            </div>

            {isLoggedIn && (
                <div className="mt-4 text-right">
                    <button
                        onClick={toggleFavorite}
                        className={`px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                    >
                        {isFavorite ? "הסר מרשימת אהובים" : "הוסף לרשימת אהובים"}
                    </button>
                </div>
            )}

            {user.postArr && user.postArr.length > 0 ? (
                <div className="space-y-6 mt-4">
                    <h2 className="text-xl font-semibold text-right">פוסטים:</h2>
                    {user.postArr.map((post: Post, index: number) => {
                        const postCardProps = mapPostToPostCardProps(post); // המרת הפוסט
                        return <PostCard key={index} post={postCardProps} />;
                    })}
                </div>
            ) : (
                <p className="mt-6 text-gray-500 text-right">אין פוסטים זמינים.</p>
            )}
        </div>
    );
};

export default ShowUser;


