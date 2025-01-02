import useUserStore from "@/app/store/userModel";
import axios from "axios";
import { getSession } from "next-auth/react";
import { getBaseUrl } from '@/app/services/config/axios'


const baseUrl = getBaseUrl();

export const getUserByUsername = async (username: string) => {
  try {
    console.log("1", username);

    const response = await axios.get(`${baseUrl}/api/users/get/username?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("2", response);

    // קבלת נתוני המשתמש מהתגובה
    const user = response.data.user;
    console.log("3", user);

    // שמירת נתוני המשתמש בסטור


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
      // Log the base URL being used
      console.log('Base URL:', baseUrl);
      
      const session = await getSession();
      console.log('Session:', session); // Log session data
      
      if (session?.user?.email) {
          console.log('Attempting email-based authentication');
          try {
              const encodedEmail = encodeURIComponent(session.user.email);
              console.log('Encoded email:', encodedEmail);
              
              const emailUrl = `${baseUrl}/api/users/get/username?email=${encodedEmail}`;
              console.log('Making request to:', emailUrl);
              
              const response = await axios.get(emailUrl, {
                  withCredentials: true,
                  headers: {
                      'Content-Type': 'application/json',
                  },
              });
              return response.data;
          } catch (emailError: any) {
              console.warn('Email auth failed:', emailError.response?.data || emailError.message);
          }
      }

      // Try username from cookie
      if (typeof window !== 'undefined') {
          console.log('Attempting cookie-based authentication');
          const cookies = document.cookie.split('; ');
          console.log('All cookies:', cookies);
          
          const usernameCookie = cookies.find(row => row.startsWith('userName='));
          console.log('Username cookie found:', usernameCookie);
          
          if (usernameCookie) {
              const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
              console.log('Decoded username:', myUserName);
              
              const encodedUsername = encodeURIComponent(myUserName);
              console.log('Encoded username:', encodedUsername);
              
              const usernameUrl = `${baseUrl}/api/users/get/username?username=${encodedUsername}`;
              console.log('Making request to:', usernameUrl);
              
              try {
                  const response = await axios.get(usernameUrl, {
                      withCredentials: true,
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  });
                  
                  console.log('Response received:', response.data);
                  return response.data;
              } catch (error: any) {
                  console.error('Request failed:', {
                      status: error.response?.status,
                      data: error.response?.data,
                      headers: error.response?.headers,
                  });
                  throw error;
              }
          } else {
              console.warn('No username cookie found');
          }
      }

      throw new Error('No authentication method available');
  } catch (error: any) {
      console.error('getMyDetails error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
      });
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
    const setUser = useUserStore.getState().setUser;
    const user = response.data.user;
    setUser(user);
    console.log('User :', response.data.user);
    return response.data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};
export const getAllUsers = async (
  page: number = 1,
  limit: number = 10,
  filters: {
    title?: string[]; // תמיכה במערך של טייטלים
    language?: string[]; // תמיכה במערך של שפות
    city?: string[]; // תמיכה במערך של ערים
  } = {}
) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters.title && { title: filters.title.join(',') }), // הפוך את המערך למחרוזת מופרדת בפסיקים
      ...(filters.language && { language: filters.language.join(',') }), // הפוך את המערך למחרוזת מופרדת בפסיקים
      ...(filters.city && { city: filters.city.join(',') }), // הפוך את המערך למחרוזת מופרדת בפסיקים
    }).toString();

    const response = await axios.get(
      `${baseUrl}/api/users/get/?${queryParams}`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('users:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
