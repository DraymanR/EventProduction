import useUserStore from "@/app/store/userModel";
import axios from "axios";
import { getSession } from "next-auth/react";
import { getBaseUrl } from '@/app/services/config/axios'


const baseUrl = getBaseUrl();

export const getUserByUsername = async (username: string) => {
    try {
      const response = await axios.get(`${baseUrl}/api/users/get/username?username=${username}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      // קבלת נתוני המשתמש מהתגובה
      const user = response.data.user;
  
      // שמירת נתוני המשתמש בסטור
      const setUser = useUserStore.getState().setUser;
      setUser(user);
  
      console.log("User successfully stored in Zustand:", user);
  
      // החזרת נתוני המשתמש
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; // טיפול בשגיאות
    }
  };
  
export const getMyDetails = async () => {
    try {
        console.log("await getSession();");

        // First, check if there's a NextAuth session
        const session = await getSession();
        console.log(session);

        // If a session exists (Google or regular with token)
        if (session?.user) {
            console.log("session?.user");

            // Try to fetch by email first (for Google auth)
            if (session.user.email) {
                try {
                    const response = await axios.get(`${baseUrl}/api/users/get/username?email=${session.user.email}`, {
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
        console.log("! session");

        // Fallback to cookie-based username retrieval
        if (typeof window !== 'undefined') {
            const cookies = document.cookie.split('; ');
            const usernameCookie = cookies.find(row => row.startsWith('userName='));
            if (usernameCookie) {
                const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
                console.log('Username from cookie:', myUserName);

                const response = await axios.get(`${baseUrl}/api/users/get/username?username=${myUserName}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('User (Cookie Auth):', response.data);
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

export const getUserDetails = async (userName: string) => {
    try {
        const response = await axios.get(`${baseUrl}/api/users/get/username?username=${userName}`, {
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
