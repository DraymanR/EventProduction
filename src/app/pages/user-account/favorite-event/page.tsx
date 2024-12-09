"use client";

import React from "react";
import FavoriteEvent from "@/app/component/users/FavoriteEvent";
import { Post } from "@/app/types/user";
// import { BrowserRouter } from "react-router-dom";
import dynamic from 'next/dynamic';

// טוען את BrowserRouter רק בצד הלקוח
const BrowserRouter = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), {
  ssr: false,  // מבטל את העיבוד בצד השרת
});

const mockFavoritePosts: Post[] = [
    {
      createDate: new Date(),
      userName: "משתמש 1",
      album: ["https://via.placeholder.com/150"],
      title: "אירוע לדוגמה 1",
      description: "תיאור של אירוע לדוגמה 1",
      recommendations: [],
      postId: "1" as any
    },
    {
      createDate: new Date(),
      userName: "משתמש 2",
      album: ["https://via.placeholder.com/150"],
      title: "אירוע לדוגמה 2",
      description: "תיאור של אירוע לדוגמה 2",
      recommendations: [],
      postId: "2" as any
    },
  ];
  
const page = () => {
  return (
    <BrowserRouter>
    <div>
      <h1>רשימת אירועים מועדפים</h1>
      <FavoriteEvent favoritePosts={mockFavoritePosts} />
    </div>
    </BrowserRouter>

  );
};

export default page;
