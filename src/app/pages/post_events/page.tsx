"use client";
import React from "react";
import { Post, Recommendation } from "../../types/user"; // ייבוא הממשקים
import PostEvent from "@/app/component/PostEvent";

const Page: React.FC = () => {
  const post: Post = {
    postId: 1, // הוספת postId
    title: "חתונת הכסף של ההורים היקרים שלי",
    userName: "Esther Cohen",
    createDate: new Date(),
    description: "מצורפות כאן תמונות מאירוע חתונת הכסף שחגגנו להורינו היקרים. מצדיעה למפיקה ג.ל.מעצבת האולם ולקייטרינג המדהים של בן אפשטיין. אתם מוזמנים לצפות ולהגיב.",
    album: [], // אפשר להוסיף כאן קישורים לתמונות בתחילה אם יש לך
    recommendations: [] // הוספת recommendations
  };

  return (
    <div>
      <h1>Event Page</h1>
      <PostEvent post={post} recommendations={post.recommendations} />
    </div>
  );
};

export default Page;
