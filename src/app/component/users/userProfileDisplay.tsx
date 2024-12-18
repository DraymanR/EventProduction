'use client'
import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/app/services/user/getDetails';  // נניח שזו פונקציה ששולחת בקשה ל-API
import { Post } from '@/app/types/user';  // נניח שיש לך טיפוס כזה
// import { useUserStore } from '@/app/store/userModel';

const UserProfileDisplay = ({ username }: { username: string }) => {
    console.log("hh")
  const [user, setUser] = useState<any>(null);  // הנתונים של המשתמש
  const [isFavorite, setIsFavorite] = useState<boolean>(false);  // מצב האם המשתמש ברשימת האהובים
  const [posts, setPosts] = useState<Post[]>([]);  // רשימת הפוסטים של המשתמש
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);  // האם המשתמש מחובר
  const [isSupplier, setIsSupplier] = useState<boolean>(false);  // האם המשתמש הוא ספק

//   const { userData, likedPostsArr, likedPeople } = useUserStore(state => ({
//     userData: state.userData,
//     likedPostsArr: state.likedPostsArr,
//     likedPeople: state.likedPeople
//   }));

  useEffect(() => {
    // שליחת בקשה לקבלת פרטי המשתמש
    const fetchUserData = async () => {
      try {
        const data = await getUserByUsername(username);
        console.log(data)
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
    <div className="user-profile">
      {user ? (
        <>
          <h2>{user.userName}</h2>
          <img src={user.profileImage || '/default-profile.png'} alt="Profile" />
          
          <div className="user-info">
            <div>
              <strong>Title:</strong> {user.titles}
            </div>
            <div>
              <strong>langueges:</strong> {user.languages}
            </div>
            <div>
              <strong>Discrption:</strong> {user.description}
            </div>
            {isSupplier && (
              <div>
                <strong>Price Range:</strong> {user.priceRange}
              </div>
            )}
            <div>
              {isLoggedIn && <span>🟢 Online</span>}
              {!isLoggedIn && <span>🔴 Offline</span>}
            </div>
            <button onClick={toggleFavorite}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>

          <div className="posts">
            <h3>Posts by {user.userName}</h3>
            {posts.length > 0 ? (
              posts.map((post,i) => (
                <div key={i} className="post">
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <p><strong>Created on:</strong> {new Date(post.createDate).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No posts yet</p>
            )}
          </div>

          <div className="contact">
            <h3>Contact Information</h3>
            <p>{user.email}</p>
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserProfileDisplay;
