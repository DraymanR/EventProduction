"use client";
import React, { useState, useEffect } from "react";
import { Post, Recommendation } from "../../types/user"; // ייבוא הממשקים
import "./PostEvent.css";
import { ObjectId } from "mongoose";

import Image from "next/image";


interface PostEventProps {
  post: Post;
<<<<<<< HEAD
  recommendations: Recommendation[];
}

const PostEvent: React.FC<PostEventProps> = ({ post, recommendations }) => {
  const [comments, setComments] = useState<Recommendation[]>(() => {
    if (typeof window !== "undefined") {
      // בדיקה אם ה-window זמין
=======
  recommendations: ObjectId[];
  // recommendations: Recommendation[];
}

const PostEvent: React.FC<PostEventProps> = ({ post, recommendations }) => {

  const [comments, setComments] = useState<Recommendation[]>(() => {

    if (typeof window !== "undefined") {  // בדיקה אם ה-window זמין
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
      const storedComments = localStorage.getItem("comments");
      return storedComments ? JSON.parse(storedComments) : recommendations;
    } else {
      return recommendations;
    }
  });

  const [newComment, setNewComment] = useState<string>("");
  const [newRate, setNewRate] = useState<number>(0);
  const [images, setImages] = useState<string[]>(post.album || []);
<<<<<<< HEAD
  const [currentUser, setCurrentUser] = useState<string>("");

  // שליפת שם המשתמש המחובר מה-cookies
  useEffect(() => {
    const userName = decodeURIComponent(document.cookie.split("=")[1]);
    setCurrentUser(userName);
  }, []);
=======
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a

  // שמירת תגובות ב-localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  // שמירת תמונות ב-localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("images", JSON.stringify(images));
    }
  }, [images]);

  const handleAddComment = () => {
    if (newComment.trim() && newRate > 0) {
      const newRecommendation: Recommendation = {
<<<<<<< HEAD
        userName: currentUser, // שם המשתמש מה-cookies
=======
        userName: "currentUser", // יש להחליף לשם המשתמש המחובר
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
        text: newComment,
        rate: newRate,
      };
      setComments([...comments, newRecommendation]);
      setNewComment("");
      setNewRate(0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="post-event">
      <div className="header">
        <h2>{post.title}</h2>
        <p className="user-name">מאת {post.userName}</p>
<<<<<<< HEAD
        <p className="date">{new Date(post.createDate).toLocaleDateString()}</p>
=======
        <p className="date">{post.createDate.toLocaleDateString()}</p>
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
      </div>
      <p className="description">{post.description}</p>
      <div className="image-gallery">
        <h3>אלבום תמונות</h3>
        <div className="images">
          {images.map((image, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={index} src={image} alt={`image-${index}`} />
          ))}
        </div>
        <div className="image-upload">
          <input type="file" onChange={handleImageUpload} />
        </div>
      </div>
      <div className="comments">
        <h3>תגובות והמלצות</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.userName}</strong>: {comment.text} ⭐{comment.rate}/5
            </li>
          ))}
        </ul>
        <textarea
          placeholder="הוסיפו תגובה..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <select
          value={newRate}
          onChange={(e) => setNewRate(Number(e.target.value))}
        >
          <option value={0}>דרגו את האירוע</option>
          {[1, 2, 3, 4, 5].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <button onClick={handleAddComment}>הוספת תגובה</button>
      </div>
    </div>
  );
};

export default PostEvent;
