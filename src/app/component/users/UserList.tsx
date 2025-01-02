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
  const [filters, setFilters] = useState<{ language?: string[]; title?: string[]; city?: string[] }>({
    language: [],
    title: [],
    city: [],
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadUsers = async () => {
    if (loading || noMoreUsers) return;
    setLoading(true);

    try {
      console.log("page to get", page);
      const data = await getAllUsers(page, 10, filters);
      console.log("Fetched users:", data.users);

      if (data.users.length === 0) {
        setNoMoreUsers(true);
        return;
      }

      setFilteredUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: { language?: string[]; title?: string[]; city?: string[] }) => {
    setFilters(newFilters);
    setFilteredUsers([]);
    setPage(1);
    setNoMoreUsers(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  useEffect(() => {
    loadUsers();
  }, [page, filters]);

  return (
    <div className="posts-container">
      <h1 className="posts-title">יוזרים</h1>
      <div className="search-bar-container">
        <SortFilter onFilterChange={handleFilterChange} setFilteredUsers={setFilteredUsers} />
      </div>
      <div className="posts-list">
        {filteredUsers.map((user: any, index: number) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
      {loading && <div className="loading-text">טוען...</div>}
      {noMoreUsers && <div className="no-more-posts-text">אין יותר יוזרים לטעון</div>}
      <div className="pagination flex justify-center items-center gap-4 mt-6">
        {/* Arrow Up for Previous Page */}
        <button
          className="pagination-arrow text-xl p-2 rounded-full hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          ↑
        </button>
        <span className="font-semibold text-lg">
          עמוד {page} מתוך {totalPages}
        </span>
        {/* Arrow Down for Next Page */}
        <button
          className="pagination-arrow text-xl p-2 rounded-full hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default UserList;
