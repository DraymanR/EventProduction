"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../types/user";
// import "./FavoriteEvent.css";

interface FavoriteEventProps {
  favoritePosts: Post[];
}

const FavoriteEvent: React.FC<FavoriteEventProps> = ({favoritePosts}) => {
  // const navigate = useNavigate();

  // const handlePostClick = (post: Post) => {
  //   navigate(`/post_events/${post.postId}`, { state: { post } });
  // };

  return (
    <div className="favorite-event">
      <h1>האירועים המועדפים</h1>
      <ul>
        {favoritePosts.map((post) => (
          <li key={post.postId.toString()} className="favorite-item">
            <div className="post-details">
              <h2>{post.title}</h2>
              <p>
                <strong>מאת:</strong> {post.userName}
              </p>
              <p>
                <strong>תאריך:</strong>{" "}
                {new Date(post.createDate).toLocaleDateString()}
              </p>
              {/* <button onClick={() = handlePostClick(post)}>לצפייה באירוע</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteEvent;
