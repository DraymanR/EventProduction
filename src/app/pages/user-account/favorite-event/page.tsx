'use client'

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import { EventCategory, Post, PostCardProps } from "@/app/types/user";
import { useEffect, useState } from "react";
import FavoriteEvent from "@/app/component/users/FavoriteEvent";
import useUserStore from "@/app/store/userModel";
import { mapPostToPostCardProps } from "@/app/services/post/post";
import PostCard from "@/app/component/posts/PostCard";


const Home: React.FC = () => {
  const favoriteEvents = useUserStore((state) => state.likedPostsArr);
  const [MyEvents, setMyEvents] = useState<Post[]>(favoriteEvents); //  אם אנחנו 


  // useEffect(() => {
  //   const getMyPersonalDetails = async () => {
  //     console.log("ppp");

  //     try {
  //       // const FavoriteEvents = await getMyFavoriteEvents();
  //       console.log(favoriteEvents);
  //       if (!favoriteEvents) {
  //         return (
  //           <div>
  //             !FavoriteEvents
  //           </div>
  //         )
  //       }
  //       const postCardPropsArray: PostCardProps[] = favoriteEvents.map((post) => ({
  //         postId: post._id.toString(), // המרת ObjectId ל-String
  //         _id: post._id.toString(),
  //         userName: post.userName,
  //         createDate: post.createDate,
  //         PostCardProps: "",
  //         album: post.album,
  //         title: post.title,
  //         description: post.description,
  //         recommendations: post.recommendations.map((rec) => ({
  //           _id: rec.toString(),
  //           userName: '', // ערך דמה (אם אין לך נתונים)
  //           text: '', // ערך דמה
  //           rate: 0, // ערך דמה
  //         })),

  //         userDetails: [],
  //         eventCategory: EventCategory.Other
  //       }));
  //       setMyEvents(postCardPropsArray); // מעדכן את המצב
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getMyPersonalDetails()
  // }, [])

  // const handleAddEvent = () => {
  //     if (!isModalOpen) {
  //         openModal();
  //     }
  // };


  return (
    <div dir="ltr">
      {/* <button type="button" onClick={() => handleAddEvent()} className=" bg-red-400 text-white py-2 px-4 rounded-lg">הוספת אירוע</button> */}
      <PopUpWindow>
        <AddPost></AddPost>
      </PopUpWindow>
      {/* {MyEvents && (
        <FavoriteEvent favoritePosts={MyEvents} ></FavoriteEvent>
      )} */}
      <div className="space-y-6 mt-4">
        <h2 className="text-xl font-semibold text-right">פוסטים:</h2>
        {MyEvents.map((post: Post, index: number) => {
          const postCardProps = mapPostToPostCardProps(post); // המרת הפוסט
          return <PostCard key={index} post={postCardProps} />;
        })}
      </div>
    </div>

  )
}
export default Home;
