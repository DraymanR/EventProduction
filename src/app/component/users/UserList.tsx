// "use client";

// import React, { useState, useEffect } from "react";
// import "@/app/css/posts/customStyles.css";
// import { getAllUsers } from "@/app/services/user/getDetails";
// import "@/app/globals.css";
// import UserCard from "./UserCard";
// import SortFilter from "@/app/component/users/SortUser";

// const UserList = () => {
//   const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [noMoreUsers, setNoMoreUsers] = useState<boolean>(false);
//   const [filters, setFilters] = useState<{ language?:[string] ; title?:[string]; city?:[string] }>({
//     language:[ ""],
//     title:[ ""],
//     city: [""],
//   });

//   // Function to load users from the API
//   const loadUsers = async () => {
//     if (loading || noMoreUsers) return;  // מניעת קריאות כפולות
//     setLoading(true);
//     try {
//       const data = await getAllUsers(page, 10, filters);  // שלח את הסטייט המעודכן
//       console.log("Fetched users:", data.users);
//       if (data.users.length === 0) {
//         setNoMoreUsers(true);
//         return;
//       }
//       setFilteredUsers((prevUsers) => [...prevUsers, ...data.users]);  // הוסף את היוזרים החדשים
//       setPage((prevPage) => prevPage + 1);  // עדכון העמוד
//     } catch (err) {
//       setError("Failed to fetch users. Please try again later.");
//       console.error("Error loading users:", err);
//     } finally {
//       setLoading(false);  // תמיד לסיים טעינה
//     }
//   };
//   // Function to update filters
//   // const handleFilterChange = (newFilters: { language?: [string]; title?: [string]; city?: [string] }) => {
//   //   setFilters(newFilters);
//   //   console.log("jj", filteredUsers);
//   //   loadUsers();  // טען מחדש את היוזרים עם המסננים החדשים
//   // };
//   const handleFilterChange = (newFilters: { language?: [string]; title?: [string]; city?: [string] }) => {
//     setFilters(newFilters);
//     setFilteredUsers([]); // איפוס הרשימה הקיימת
//     setPage(1); // חזרה לעמוד הראשון
//     setNoMoreUsers(false); // אפשרות לטעינה מחדש
//   };
  

//   // Scroll event to load more users
//   const handleScroll = () => {
//     const bottom =
//       window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
//     if (bottom) {
//       loadUsers();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [handleScroll, loading, noMoreUsers]);

// useEffect(() => {
//     loadUsers();
//   }, [filters]);  // כאשר filters משתנה, תטעין מחדש את היוזרים

//   return (
//     <div className="posts-container">
//       <h1 className="posts-title">יוזרים</h1>
//       <div className="search-bar-container">
//         {/* Sort and Filter Component */}
//         <SortFilter onFilterChange={handleFilterChange} setFilteredUsers={setFilteredUsers}  />

//       </div>
//       <div className="posts-list">
//         {/* Render users */}
//         {filteredUsers.map((user: any, index: number) => (
//           <UserCard key={index} user={user} />
//         ))}
//       </div>
//       {loading && <div className="loading-text">טוען...</div>}
//       {noMoreUsers && <div className="no-more-posts-text">אין יותר יוזרים לטעון</div>}
//     </div>
//   );
// };
// export default UserList

"use client";

import React, { useState, useEffect } from "react";
import "@/app/css/posts/customStyles.css";
import { getAllUsers } from "@/app/services/user/getDetails";
import "@/app/globals.css";
import UserCard from "./UserCard";
import SortFilter from "@/app/component/users/SortUser";

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

  // Function to load users from the API
  const loadUsers = async () => {
    if (loading || noMoreUsers) return; // Prevent duplicate calls
    setLoading(true);
    try {
      const data = await getAllUsers(page, 10, filters); // Pass updated filters
      console.log("Fetched users:", data.users);
      if (data.users.length === 0) {
        setNoMoreUsers(true);
        return;
      }
      setFilteredUsers((prevUsers) => [...prevUsers, ...data.users]); // Append new users
      setPage((prevPage) => prevPage + 1); // Update page
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false); // Always finish loading
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
  }, [filters]); // Reload users when filters change

  return (
    <div className="posts-container">
      <h1 className="posts-title">יוזרים</h1>
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