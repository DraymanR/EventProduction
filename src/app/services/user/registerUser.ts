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
  console.log("data,",data);
 
  try {
    console.log("data,",data);
    
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
export const newPassword = async (email: string, otp: string, newPassword: string) => {
  try {
    const data = {
      "email": email,
      "otp": otp,
      "newPassword": newPassword
    }
    console.log(data);
    
    const response = await axios.post('http://localhost:3000/api/users/register/newPassword', data, {
      // withCredentials: true,
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
const GOOGLE_API_KEY = "AIzaSyCyl_TivQSm7Nzjthc5V23C60a2dBRvZ2k";


export const fetchAddressAutocomplete = async (query: string) => {
  if (!query) {
    return [];
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // הוספת אופציה עםCredentials במידת הצורך
        withCredentials: true,
      }
    );
    return response.data.predictions;
  } catch (error) {
    console.error('Error fetching autocomplete data:', error);
    if (error.response) {
      // אם יש תשובה מהשרת, הצג את השגיאה
      console.error(error.response.data);
    } else if (error.request) {
      // אם לא קיבלת תשובה מהשרת
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    return []; // במקרה של שגיאה, מחזירים מערך ריק
  }
};

export const validateAddress = async (formData: any) => {
  const query = `${formData.street} ${formData.building}, ${formData.city}, ${formData.zipCode}`;
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
    );

    if (response.data.results.length > 0) {
      const place = response.data.results[0];
      return place; // מחזירים את התוצאה כדי לעדכן את הפורם
    } else {
      return null; // אם לא נמצאה כתובת, מחזירים null
    }
  } catch (error) {
    console.error('Error validating address:', error);
    return null; // במקרה של שגיאה, מחזירים null
  }
};
