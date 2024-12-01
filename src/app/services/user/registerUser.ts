import axios from 'axios';

export const singIn = async (email: string, userName: string, password: string) => {
  
  const data = { email: email, password: password, username: userName }
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // החזרת התשובה מהשרת
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // טיפול בשגיאות
  }
};