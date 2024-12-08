import axios from "axios";

export const getMyEvents = async () => {
    try {
        if (typeof window !== 'undefined') {

            const myUserName = decodeURIComponent(document.cookie.split('=')[1])
            console.log(myUserName);
            const response = await axios.get(`http://localhost:3000/api/postes/get/username?username=${myUserName}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('User :', response.data);
            return response.data
        }
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // טיפול בשגיאות
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