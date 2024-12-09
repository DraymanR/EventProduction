import axios from "axios";
import { getMyDetails, getUserDetails } from "../user/getDetails";

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
export const getUserEvents = async (userName: string) => {
    try {
        const userDetails = await getUserDetails(userName)
        console.log(userDetails.user.postArr);
        return userDetails.user.postArr
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};
export const addingMyPost = async (newPost: object) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/posts/post`, newPost, {
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
