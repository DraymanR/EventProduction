"use client";
 // ייבוא ה-Enum של סוגי האירועים

import usePostStore from "@/app/store/postStore";
import "@/app/css/posts/customStyles.css";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "@/app/services/user/getDetails";

import '@/app/globals.css'
import UserCard from "./UserCard";

const UserList = () => {

// הגדרת state עם טיפ
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // מצב טעינה
  const [noMoreUsers, setNoMoreUsers] = useState<boolean>(false); // מצב של אין יותר פוסטים
  const loadUsers = async () => {
    if (loading || noMoreUsers) return; // אם אנחנו כבר טוענים או שאין יותר פוסטים, לא נבצע טעינה נוספת
  
    setLoading(true); // נעדכן את מצב הטעינה
    try {
      
      const data = await getAllUsers(page, 10); // העברת פרמטרים של דף ומספר פריטים
      setFilteredUsers(data.users);
      if (data.users.length === 0) {
        setNoMoreUsers(true);
        return;
      }
  
      // הוספת מניעת כפילויות באמצעות ID ייחודי של פוסט
      
  
      setPage((prevPage) => prevPage + 1); // הגדלת הדף
  
     
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
    if (bottom) {
      loadUsers();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loading, noMoreUsers]);

  useEffect(() => {
    loadUsers();
  }, []);

 

  return (
    <div className="posts-container">
      <h1 className="posts-title">יוזרים</h1>
      <div className="search-bar-container">

      </div>
      <div className="posts-list">
        {filteredUsers.map((user:any, index: number) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      {loading && (
        <div className="loading-text">טוען...</div>
      )}
      {noMoreUsers && (
        <div className="no-more-posts-text">אין יותר פוסטים לטעון</div>
      )}
    </div>
  );
  
};


export default UserList;
