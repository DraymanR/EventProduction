'use client'

import { Post } from "@/app/types/user";
import { useState } from "react";
import useUserStore from "@/app/store/userModel";
import { mapPostToPostCardProps } from "@/app/services/post/post";
import PostCard from "@/app/component/posts/PostCard";
import '@/app/globals.css'

const Home: React.FC = () => {
  const favoriteEvents = useUserStore((state) => state.likedPostsArr);
  const [MyEvents, setMyEvents] = useState<Post[]>(favoriteEvents); //  אם אנחנו 

  return (
    <div dir="ltr">

      <div className="space-y-6 mt-4">
        <h2 className="page-title">: האירועים שאהבתי</h2>
        {MyEvents.map((post: Post, index: number) => {
          const postCardProps = mapPostToPostCardProps(post); // המרת הפוסט
          return <PostCard key={index} post={postCardProps} />;
        })}
      </div>
    </div>

  )
}
export default Home;
