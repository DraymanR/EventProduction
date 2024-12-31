

"use client";

import React, { useState, useEffect } from "react";
import "@/app/css/posts/customStyles.css";
import { getAllUsers } from "@/app/services/user/getDetails";
import "@/app/globals.css";
import UserCard from "./UserCard";
import SortFilter from "./SortUser";
// import SortFilter from "@/app/component/users/SortUser";

const UserList = () => {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMoreUsers, setNoMoreUsers] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ language?: string[]; title?: string[]; city?: string[] }>(
    {
      language: [],
      title: [],
      city: [],
    }
  );

  const loadUsers = async () => {
    if (loading || noMoreUsers) return; // אם יש טעינה או אין יותר משתמשים, לא נטען שוב
    setLoading(true);
    
    try {
      const data = await getAllUsers(page, 10, filters); // שולח את הדף הנוכחי
      console.log("Fetched users:", data.users);
  
      if (data.users.length === 0) {
        setNoMoreUsers(true); // אם אין עוד משתמשים, הגדר את הדגל
        return;
      }
  
      setFilteredUsers((prevUsers) => [...prevUsers, ...data.users]); // מוסיף את המשתמשים החדשים
      setPage((prevPage) => prevPage + 1); // עדכון הדף הנוכחי
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false); // תמיד מסיים את מצב הטעינה
    }
  };
  

  // Function to update filters
  const handleFilterChange = (newFilters: { language?: string[]; title?: string[]; city?: string[] }) => {
    setFilters(newFilters);
    setFilteredUsers([]); // Reset the user list
    setPage(1); // Reset to the first page
    setNoMoreUsers(false); // Allow reloading
  };

  // Scroll event to load more users
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (bottom && !loading && !noMoreUsers) {
      loadUsers();  // Load more users when reaching the bottom
    }
  };
  

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loading, noMoreUsers]);


  useEffect(() => {
    setFilteredUsers([]); // Reset the list to ensure we start from the first page
    setPage(1); // Reset to the first page when filters change
    setNoMoreUsers(false); // Allow reloading with new filters
    loadUsers(); // Load users for the first page with new filters
  }, [filters]); // Reload users when filters change
  
  return (
    <div className="posts-container">
      <h1 className="posts-title">משתמשים</h1>
      <div className="search-bar-container">
        {/* Sort and Filter Component */}
        <SortFilter onFilterChange={handleFilterChange} setFilteredUsers={setFilteredUsers} />
      </div>
      <div className="posts-list">
        {/* Render users */}
        {filteredUsers.map((user: any, index: number) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      {loading && <div className="loading-text">טוען...</div>}
      {noMoreUsers && <div className="no-more-posts-text">אין יותר יוזרים לטעון</div>}
    </div>
  );
};

export default UserList;