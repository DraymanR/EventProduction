"use client";

import React from "react";
import { Post, PostCardProps } from "../../types/user";
import PopUpWindow from "../pop-upWindow";
import PostCard from "../posts/PostCard";
// import "./FavoriteEvent.css";

interface FavoriteEventProps {
  favoritePosts: PostCardProps[];
}

const FavoriteEvent: React.FC<FavoriteEventProps> = ({ favoritePosts }) => {
  const handlePostClick = (post: PostCardProps) => {
    return (
      <PopUpWindow>
        <PostCard post={post} />
      </PopUpWindow>
    );
  };

  return (
    <div className="favorite-event">
      <h1>האירועים המועדפים</h1>
      <ul>
        {favoritePosts.map((post: PostCardProps, index: number) => (
          <PostCard key={index} post={post} />

          // <li key={post.postId.toString()} className="favorite-item">
          //   <div className="post-details">
          //     <h2>{post.title}</h2>
          //     <p>
          //       <strong>מאת:</strong> {post.userName}
          //     </p>
          //     <p>
          //       <strong>תאריך:</strong>{" "}
          //       {new Date(post.createDate).toLocaleDateString()}
          //     </p>
          //     <button onClick={() => handlePostClick(post)}>
          //       לצפייה באירוע
          //     </button>
          //   </div>
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteEvent;
