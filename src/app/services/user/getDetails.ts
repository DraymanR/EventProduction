import axios from "axios";
import { getSession } from "next-auth/react";

export const getMyDetails = async () => {
    try {
        // First, check if there's a NextAuth session
        const session = await getSession();

        // If a session exists (Google or regular with token)
        if (session?.user) {
            // Try to fetch by email first (for Google auth)
            if (session.user.email) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/users/get/username?email=${session.user.email}`, {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log('User (Google/Token Auth):', response.data.user);
                    return response.data;
                } catch (emailError) {
                    console.warn('Error fetching by email:', emailError);
                }
            }
        }

        // Fallback to cookie-based username retrieval
        if (typeof window !== 'undefined') {
            const cookies = document.cookie.split('; ');
            const usernameCookie = cookies.find(row => row.startsWith('username='));
            
            if (usernameCookie) {
                const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
                console.log('Username from cookie:', myUserName);

                const response = await axios.get(`http://localhost:3000/api/users/get/username?username=${myUserName}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('User (Cookie Auth):', response.data.user);
                return response.data;
            }
        }

        // If no authentication method found
        throw new Error('No authenticated user found');
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};