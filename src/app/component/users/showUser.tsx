'use client';

import React, { useEffect, useState } from 'react';
import { getUserDetails } from '@/app/services/user/getDetails';
import '@/app/css/users/showUser.css';
import '@/app/globals.css';
import {  UserResponseData } from '@/app/types/user';
import PostCard from '../posts/PostCard';
import useUserStore from '@/app/store/userModel';
import { PostCardProps } from '@/app/types/post';

const ShowUser = ({ userName }: { userName: string }) => {
    // Get values and actions from the store
    const { 
        user, 
        postArr,
        setUser,
        setPostArr

    } = useUserStore();
    
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetails = await getUserDetails(userName);
                console.log("Fetched User:", userDetails);
                setUser(userDetails.user);
                // Update posts in the store
                if (userDetails.user.postArr) {
                    setPostArr(userDetails.user.postArr);
                }
                setError(null);
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
                    setLoggedInUser(myUserName);
                }
            }
        };

        fetchUser();
        checkIfLoggedIn();
    }, [userName, setUser, setError, setPostArr]);

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-6 text-gray-700">טוען...</div>;
    }

    return (
        <div className="userDetails">
            {/* Previous user details code remains the same */}
            
            {/* Updated posts section using store data */}
            {postArr && postArr.length > 0 ? (
                <div className="postsContainer">
                    <h2 className="postsHeader">פוסטים:</h2>
                    {postArr.map((post: PostCardProps, index: number) => (
                        <PostCard key={post._id || index} post={post} />
                    ))}
                </div>
            ) : (
                <p className="noPostsMessage">אין פוסטים זמינים.</p>
            )}
        </div>
    );
};

export default ShowUser;