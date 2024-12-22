'use client'

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import { Post, PostCardProps } from "@/app/types/user";
import { useEffect, useState } from "react";
import FavoriteEvent from "@/app/component/users/FavoriteEvent";
import useUserStore from "@/app/store/userModel";


const Home: React.FC = () => {
  const [MyEvents, setMyEvents] = useState<PostCardProps[]>(); //  אם אנחנו 
  const FavoriteEvents = useUserStore((state) => state.likedPostsArr);

  useEffect(() => {
    const getMyPersonalDetails = async () => {
      console.log("ppp");

      try {
        // const FavoriteEvents = await getMyFavoriteEvents();
        console.log(FavoriteEvents);
        if (!FavoriteEvents) {
          return (
            <div>
              !FavoriteEvents
            </div>
          )
        }
        const postCardPropsArray: PostCardProps[] = FavoriteEvents.map((post) => ({
          postId: post._id.toString(), // המרת ObjectId ל-String
          _id: post._id.toString(),
          userName: post.userName,
          createDate: post.createDate,
          album: post.album,
          title: post.title,
          description: post.description,
          recommendations: post.recommendations.map((rec) => ({
            _id: rec.toString(),
            userName: '', // ערך דמה (אם אין לך נתונים)
            text: '', // ערך דמה
            rate: 0, // ערך דמה
          })),
        }));
        setMyEvents(postCardPropsArray); // מעדכן את המצב
      } catch (error) {
        console.error(error);
      }
    }
    getMyPersonalDetails()
  }, [])

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
      {MyEvents && (
        <FavoriteEvent favoritePosts={MyEvents} ></FavoriteEvent>
      )}
    </div>

  )
}
export default Home;
