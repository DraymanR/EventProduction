import { Address, UserFormData } from '@/app/types/user';
import axios from 'axios';
// import axios from '';

export const singIn = async (email: string, userName: string, password: string) => {

  const data = { email: email, password: password, userName: userName }
  try {
    console.log("data", data);

    const response = await axios.post('http://localhost:3000/api/users/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    // החזרת התשובה מהשרת
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};
export const addUser = async (data: UserFormData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/post', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};

export const getMyDetails = async () => {
  try {

    const myUserName = decodeURIComponent(document.cookie.split('=')[1])
    console.log(myUserName);

    const response = await axios.get(`http://localhost:3000/api/users/get/username?username=${myUserName}`, {
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

export const forgetPassword = async (data: string) => {
  try {
    const email = { 'email': data }
    const response = await axios.post('http://localhost:3000/api/users/register/forgetPassword', email, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};

export const logout = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};
