"use client";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "@/app/services/post/post"; // עדכן את הנתיב למיקום הקובץ
import PostCard from "./PostCard";
import { PostCardProps, EventCategory } from "@/app/types/user"; // ייבוא ה-Enum של סוגי האירועים
import SearchBar from "../SearchBar";

const PostList = () => {
  const [posts, setPosts] = useState<PostCardProps[]>([]); // הגדרת state עם טיפ
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
        setNoMorePosts(true); // אין יותר פוסטים לטעון
        return;
      }

      // הוספת מניעת כפילויות באמצעות ID ייחודי של פוסט
      const newPosts = data.posts.filter(
        (post: { postId: any }) =>
          !posts.some((existingPost) => existingPost.postId === post.postId)
      );
      console.log("ff");
      

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);
      setPage((prevPage) => prevPage + 1); // הגדלת הדף

      if (newPosts.length < 10) {
        setNoMorePosts(true); // אין יותר פוסטים לטעון לאחר מכן
      }
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false); // נשחרר את מצב הטעינה
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 100; // הוספת מרווח קטן לחישוב התחתית
    if (bottom) {
      loadPosts(); // אם הגענו לתחתית, נטעין עוד פוסטים
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
  }, []); // טעינה של הפוסטים רק פעם אחת

  const handleSearch = (
    userName: string,
    eventTitle: string,
    eventType: EventCategory
  ) => {
    const results = posts.filter((post) => {
      const matchUserName = post.userName
        .toLowerCase()
        .includes(userName.toLowerCase());
      const matchEventTitle = post.title
        .toLowerCase()
        .includes(eventTitle.toLowerCase());
      const matchEventType = post.postId
        ? post.postId.eventCategory === eventType
        : null;
      return (
        matchUserName && matchEventTitle && (eventType ? matchEventType : true)
      );
    });
    setFilteredPosts(results);
  };

  if (error) {
    return (
      <div className="text-red-600 font-bold text-center mt-4">{error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        פוסטים
      </h1>
      <div className="mt-12">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="space-y-6">
        {filteredPosts.map((post: PostCardProps, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      {loading && (
        <div className="text-center py-4 animate-pulse text-gray-500">
          טוען...
        </div>
      )}
      {noMorePosts && (
        <div className="text-center py-4 text-gray-500">
          אין יותר פוסטים לטעון
        </div>
        
    )}
    </div>
  )
};
export default PostList;
