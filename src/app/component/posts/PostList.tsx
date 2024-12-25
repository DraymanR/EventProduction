"use client";
import { PostCardProps, EventCategory } from "@/app/types/post"; // ייבוא ה-Enum של סוגי האירועים
import SearchBar from "@/app/component/SearchBar";
import usePostStore from "@/app/store/postStore";
import "@/app/css/posts/customStyles.css";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "@/app/services/post/post";
import PostCard from "./PostCard";
import '@/app/globals.css'

const PostList = () => {
    const { posts, setPosts } = usePostStore(); 
  const [postss, setPostss] = useState<PostCardProps[]>([]); // הגדרת state עם טיפ
  const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); // מצב טעינה
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false); // מצב של אין יותר פוסטים
  const loadPosts = async () => {
    if (loading || noMorePosts) return; // אם אנחנו כבר טוענים או שאין יותר פוסטים, לא נבצע טעינה נוספת
  
    setLoading(true); // נעדכן את מצב הטעינה
    try {
      const data = await getAllPosts(page, 10); // העברת פרמטרים של דף ומספר פריטים
  
      if (data.posts.length === 0) {
        setNoMorePosts(true);
        return;
      }
  
      // הוספת מניעת כפילויות באמצעות ID ייחודי של פוסט
      const newPosts = data.posts.filter(
        (post: { postId: any }) =>
          !posts.some((existingPost) => existingPost.postId === post.postId)
      );
      setPosts(newPosts);
      // עדכון הסטור עם הפוסטים החדשים
      setPostss((prevPosts) => [...prevPosts, ...newPosts]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);
  
      setPage((prevPage) => prevPage + 1); // הגדלת הדף
  
      if (newPosts.length < 10) {
        setNoMorePosts(true);
      }
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
      loadPosts();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, loading, noMorePosts]);

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSearch = (
    userName: string,
    eventTitle: string,
    eventType: EventCategory,
    startDate: string,
    endDate: string,
    description: string
  ) => {
    const results = posts.filter((post) => {
      const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
      const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
      const matchEventType = eventType ? post.postId?.eventCategory === eventType : true;
      const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
  
      const postDate = new Date(post.createDate);
      const isWithinDateRange =
        (!startDate || postDate >= new Date(startDate)) &&
        (!endDate || postDate <= new Date(endDate));
  
      return (
        matchUserName &&
        matchEventTitle &&
        matchEventType &&
        matchDescription &&
        isWithinDateRange
      );
    });
    setFilteredPosts(results);
  };
  

  if (error) {
    return (
      <div className="error-message">{error}</div>
    );
  }

  return (
    <div className="posts-container">
      <h1 className="posts-title">פוסטים</h1>
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="posts-list">
        {filteredPosts.map((post: PostCardProps, index: number) => (
          
          <PostCard key={index} post={post} />
        ))}
      </div>
      {loading && (
        <div className="loading-text">טוען...</div>
      )}
      {noMorePosts && (
        <div className="no-more-posts-text">אין יותר פוסטים לטעון</div>
      )}
    </div>
  );
  
};


export default PostList;
