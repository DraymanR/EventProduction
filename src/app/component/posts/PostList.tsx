"use client";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "@/app/services/post/post";
import PostCard from "./PostCard";
import { PostCardProps, EventCategory, Title } from "@/app/types/user";
import SearchBar from "@/app/component/SearchBar";

const PostList = () => {
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false);

  const loadPosts = async () => {
    if (loading || noMorePosts) return;

    setLoading(true);
    try {
      const data = await getAllPosts(page, 10);
      if (data.posts.length === 0) {
        setNoMorePosts(true);
        return;
      }

      const newPosts = data.posts.filter(
        (post: { postId: any }) =>
          !posts.some((existingPost) => existingPost.postId === post.postId)
      );

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);
      setPage((prevPage) => prevPage + 1);

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
    description: string,
    userTitle: Title
  ) => {
    const results = posts.filter((post) => {
      const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
      const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
      const matchEventType = eventType ? post.eventCategory === eventType : true;
      const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
      const postDate = new Date(post.createDate);
      const isWithinDateRange =
        (!startDate || postDate >= new Date(startDate)) &&
        (!endDate || postDate <= new Date(endDate));
      const matchUserTitle = userTitle
        ? post.userDetails?.titles.includes(userTitle)
        : true;

      return (
        matchUserName &&
        matchEventTitle &&
        matchEventType &&
        matchDescription &&
        isWithinDateRange &&
        matchUserTitle
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
  );
};

export default PostList;
