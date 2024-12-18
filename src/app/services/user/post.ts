import axios from "axios";

// פעולה להוספת פוסט למשתמש
export const addPostToUser = async (post: object) => {
  try {
    // שליפת שם המשתמש מהעוגיות
    const username = decodeURIComponent(document.cookie.split("=")[1]);
    console.log(username);

    // שליחת בקשה לשרת
    const response = await axios.post(
      `http://localhost:3000/api/posts/post/username?username=${username}`,
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Post added successfully:", response.data);

    // החזרת תגובה מהשרת
    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error; // טיפול בשגיאות
  }
};

// פעולה לשליפת כל הפוסטים של משתמש
export const getUserPosts = async () => {
  try {
    // שליפת שם המשתמש מהעוגיות
    const username = decodeURIComponent(document.cookie.split("=")[1]);
    console.log(username);

    // קריאה לשרת לקבלת נתוני המשתמש
    const response = await axios.get(
      `http://localhost:3000/api/users/get/username?username=${username}`
    );

    console.log("User fetched successfully:", response.data);

    // החזרת ה-postArr מתוך אובייקט המשתמש
    return response.data.postArr;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; // טיפול בשגיאות
  }
};
