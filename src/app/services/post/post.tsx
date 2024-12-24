import axios from "axios";
import { getMyDetails, getUserDetails } from "../user/getDetails";
import { ObjectId } from "mongoose";
import { getBaseUrl } from "../config/axios";
import useUserStore from "@/app/store/userModel";
import { EventCategory, Post, PostCardProps } from "@/app/types/user";


const baseUrl = getBaseUrl();

// פונקציה להוספת המלצה לפוסט
export const addRecommendation = async (postId: string, text: string, rate: number) => {
    try {
        const recommendation = {
            postId,
            text,
            rate,
        };

        const response = await axios.post(`${baseUrl}/api/recommendation`, recommendation, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Recommendation added:', response.data.recommendation);
        return response.data;
    } catch (error) {
        console.error('Error adding recommendation:', error);
        throw error;
    }
};

export const getMyEvents = async () => {
    try {
        const userDetails = await getMyDetails()
        console.log(userDetails.user.postArr);
        return userDetails.user.postArr
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};
// export const getMyFavoriteEvents = async () => {
//     try {
//         const userDetails = await getMyDetails()
//         return userDetails.user.likedPostsArr
//     } catch (error) {
//         console.error('Error registering user:', error);
//         throw error; // טיפול בשגיאות
//     }
// };
export const getUserEvents = async (userName: string) => {
    try {
        const userDetails = await getUserDetails(userName)
        console.log(userDetails.user.postArr);
        return userDetails.user.postArr
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getAllPosts = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/get?page=${page}&limit=${limit}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Posts:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const getPost = async (page: number = 1, limit: number = 10, postId: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/posts/get?page=${page}&limit=${limit}&postId=${postId}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Post:', response.data.posts[0]);
        return response.data.posts[0];
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
export const addingMyPost = async (newPost: object) => {
    try {
        const response = await axios.post(`${baseUrl}/api/posts/post`, newPost, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};

export const addingMyFavoritePost = async (post_id: string) => {
    try {
        console.log(post_id);
        
        const newPost = { "favoritePostID": post_id }
        const response = await axios.put(`${baseUrl}/api/users/favorites`, newPost, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};