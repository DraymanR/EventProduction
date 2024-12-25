"use client";
import React from "react";
import PostEvent from "@/app/component/PostEvent";
import mongoose from "mongoose";
import { Post } from "@/app/types/post";

const Page: React.FC = () => {
  const post: Post = {
    createDate: new Date(),
    userName: "Esther Cohen",
    album: [], // אפשר להוסיף כאן קישורים לתמונות בתחילה אם יש לך
    postId: "1" as any,
    // postId: 1, // הוספת postId
    title: "חתונת הכסף של ההורים היקרים שלי",
    description: "מצורפות כאן תמונות מאירוע חתונת הכסף שחגגנו להורינו היקרים. מצדיעה למפיקה ג.ל.מעצבת האולם ולקייטרינג המדהים של בן אפשטיין. אתם מוזמנים לצפות ולהגיב.",
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
