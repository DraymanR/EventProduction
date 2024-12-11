import axios from "axios";

export const getMyDetails = async () => {
    try {
        if (typeof window !== 'undefined') {
        const myUserName =await decodeURIComponent(document.cookie.split('=')[1])
        console.log(myUserName);

        const response = await axios.get(`http://localhost:3000/api/users/get/username?username=${myUserName}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User :', response.data.user);
        return response.data }
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};

export const getUserDetails = async (userName: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/users/get/username?username=${userName}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User :', response.data.user);
        return response.data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
    }
};