import axios from "axios";
import { getMyDetails } from "../user/getDetails";

// פונקציה להוספת המלצה לפוסט
export const addRecommendation = async (postId: string, text: string, rate: number) => {
    try {
        const recommendation = {
            postId,
            text,
            rate,
        };

        const response = await axios.post('http://localhost:3000/api/recommendation', recommendation, {
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
        const userDetails = getMyDetails()
        return userDetails
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};
export const getAllPosts = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/posts/get?page=${page}&limit=${limit}`, {
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
export const getUserEvents = async (userName: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/postes/get/username?username=${userName}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User :', response.data);
        return response.data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};