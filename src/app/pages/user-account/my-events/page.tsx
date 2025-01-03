"use client";

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import { Post, PostCardProps } from "@/app/types/post";
import { useEffect, useState } from "react";
import useUserStore from "@/app/store/userModel";
import PostCard from "@/app/component/posts/PostCard";
import "@/app/globals.css";
import useModalStore from "@/app/store/modelStore";

const Home: React.FC = () => {
  const openModal = useModalStore(
    (state: { openModal: any }) => state.openModal
  );
  const isModalOpen = useModalStore(
    (state: { isModalOpen: any }) => state.isModalOpen
  );
  const postArr = useUserStore((state) => state.postArr);
  const [MyEvents, setMyEvents] = useState<PostCardProps[]>(postArr);

  const handleAddEvent = () => {
    if (!isModalOpen) {
      openModal();
    }
  };

  useEffect(() => {
    setMyEvents(postArr);
  }, [postArr]);

  return (
    <div dir="rtl" className="flex-col items-center">
      <PopUpWindow>
        <AddPost></AddPost>
      </PopUpWindow>
      <button
        type="button"
        onClick={() => handleAddEvent()}
        className="button-primary"
      >
        הוספת אירוע
      </button>
      <div className="space-y-6 mt-4">
        <h2 className="page-title">:האירועים שלי</h2>
        {MyEvents.map((post: PostCardProps, index: number) => {
          // המרת הפוסט

          return <PostCard key={index} post={post} />;
        })}
      </div>
     
    </div>
  );
};
export default Home;
