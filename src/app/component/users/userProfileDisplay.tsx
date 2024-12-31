'use client'
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/app/services/user/getDetails';  // נניח שזו פונקציה ששולחת בקשה ל-API
import { Post } from '@/app/types/post';  // נניח שיש לך טיפוס כזה
import defaulPprofileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import Link from 'next/link';

const UserProfileDisplay = ({ username }: { username: string }) => {
  const [user, setUser] = useState<any>(null);  // הנתונים של המשתמש
  const [isFavorite, setIsFavorite] = useState<boolean>(false);  // מצב האם המשתמש ברשימת האהובים
  const [posts, setPosts] = useState<Post[]>([]);  // רשימת הפוסטים של המשתמש
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // האם המשתמש מחובר
  const [isSupplier, setIsSupplier] = useState<boolean>(false);  // האם המשתמש הוא ספק

  useEffect(() => {
    // שליחת בקשה לקבלת פרטי המשתמש
    const fetchUserData = async () => {
      try {
        const data = await getUserByUsername(username);
        setUser(data);
        setPosts(data.postArr);
        setIsLoggedIn(data.isLoggedIn);
        setIsSupplier(data.isSupplier);

        // setIsFavorite(likedPeople.includes(data.userName));  // בדוק אם המשתמש נמצא ברשימת האהובים
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, [username]);

  const toggleFavorite = () => {
    // הפונקציה שמבצעת הוספה/מחיקה מרשימת האהובים
    if (isFavorite) {
      // מחיקת אהוב
      // יש להוסיף את הקוד למחיקת המשתמש מרשימת האהובים
    } else {
      // הוספת אהוב
      // יש להוסיף את הקוד להוספת המשתמש לרשימת האהובים
    }
    setIsFavorite(!isFavorite);
  };


  return (
    <div className="user-profile bg-gradient-to-b from-gray-100 to-blue-50 p-6">
      {user ? (
        <>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
              פרופיל משתמש: {user.userName}
            </h2>
            <div className="flex flex-col items-center mb-6">
              {user.profileImage ? (
                <Image
                  src={defaulPprofileImage}
                  alt="תמונת פרופיל"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-blue-300"
                />
              ) : (
                <img
                  src={user.profileImage}
                  alt="תמונת פרופיל"
                  className="rounded-full border-2 border-blue-300"
                />
              )}
            </div>

            <div className="user-info text-gray-800">
              <div className="mb-2">
                <strong className="text-blue-600">תוארים:</strong> {user?.titles.filter(Boolean).join(", ") || "אין תארים זמינים"}              </div>
              <div className="mb-2">
                <strong className="text-blue-600">שפות:</strong> {user?.languages.filter(Boolean).join(", ") || "אין שפה זמינה"}
              </div>
              <div className="mb-2">
                <strong className="text-blue-600">תיאור:</strong> {user.description}
              </div>
              {isSupplier && (
                <div className="mb-2">
                  <strong className="text-blue-600">טווח מחירים:</strong> {user.priceRange}
                </div>
              )}
              <div className="mb-4">
                {isLoggedIn ? (
                  <span className="text-green-600 font-semibold">🟢 מחובר</span>
                ) : (
                  <span className="text-red-600 font-semibold">🔴 לא מחובר</span>
                )}
              </div>
              {/* <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded-lg text-white font-semibold ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
              >
                {isFavorite ? 'הסר מהמועדפים' : 'הוסף למועדפים'}
              </button> */}
            </div>
          </div>

          <div className="posts bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              פוסטים של {user.userName}
            </h3>
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div
                  key={i}
                  className="post border-b last:border-b-0 py-4 text-gray-800"
                ><div className="mr-4">
                    {/* <a href={`/pages/posts/${post.postId.toString()}`} className="text-blue-500 hover:underline">
                      {post.title}
                    </a> */}

                    <a href={`/pages/posts/${post._id.toString()}`} className="text-blue-500 hover:underline">
                      {post.title}
                    </a>

                  </div>
                  <p>{post.postId.toString()}</p>
                  <h4 className="text-lg font-semibold">{post.title}</h4>
                  <p className="text-gray-600">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    <strong>נוצר בתאריך:</strong>{' '}
                    {new Date(post.createDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">אין פוסטים עדיין</p>
            )}
          </div>

          <div className="contact bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">פרטי קשר</h3>
            <div className="mb-2">
              <strong className="text-blue-600">מייל:</strong> {user.email}
            </div><div className="mb-2">
              <strong className="text-blue-600">טלפון:</strong> {user.phone}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">טוען נתוני משתמש...</p>
      )}
    </div>
  );


};

export default UserProfileDisplay;
