import { Address, UserFormData } from "@/app/types/user";
import { signOut } from "next-auth/react";
import useUserStore from "@/app/store/userModel";
import axios from "axios";
import { getBaseUrl } from "../config/axios";
import { getUserDetails } from '@/app/services/user/getDetails'
import { PostCardProps } from "@/app/types/post";
import useNavbarStore from "@/app/store/navbarStore";


const baseUrl = getBaseUrl();

export const singIn = async (
  email: string,
  userName: string,
  password: string
) => {
  const data = { email: email, password: password, userName: userName };
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    getUserDetails(userName);
    // החזרת התשובה מהשרת
    console.log(response);

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // טיפול בשגיאות
  }
};

export const addUser = async (data: UserFormData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/post`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // טיפול בשגיאות
  }
};

export const forgetPassword = async (data: string) => {
  try {
    const email = { email: data };
    const response = await axios.post(
      `${baseUrl}/api/users/register/forgetPassword`,
      email,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // טיפול בשגיאות
  }
};
export const newPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  try {
    const data = {
      email: email,
      otp: otp,
      newPassword: newPassword,
    };
    const response = await axios.post(`${baseUrl}/api/users/register/newPassword`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    console.log(response);
    // getUserDetails(userName);
    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // טיפול בשגיאות
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/logout`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await signOut({
      redirect: false, // Prevent automatic redirection
    });
    console.log(response);
    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // טיפול בשגיאות
  }
};


export const updateUserStore = (
  user: UserFormData,
  likedPosts: PostCardProps[],
  likedPeople: string[],
  posts: PostCardProps[]
) => {
  useUserStore.getState().setUser(user);
  useUserStore.getState().setLikedPostsArr(likedPosts);
  useUserStore.getState().setLikedPeople(likedPeople);
  useUserStore.getState().setPostArr(posts);
  useUserStore.getState().setReady(true);
};

export const useUpdateUserStore = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setPosts = useUserStore((state) => state.setPostArr);
  const setLikedPostsArr = useUserStore((state) => state.setLikedPostsArr);
  const setLikedPeople = useUserStore((state) => state.setLikedPeople);

  return (
    userData: UserFormData,
    likedPostsArr: PostCardProps[],
    likedPeople: string[],
    postArr: PostCardProps[]
  ) => {
    setUser(userData);
    setPosts(postArr);
    setLikedPeople(likedPeople);
    setLikedPostsArr(likedPostsArr);
  };
};

export const checkIfLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split('; ');
    const usernameCookie = cookies.find(row => row.startsWith('userName='));
    
    return usernameCookie
  }

};