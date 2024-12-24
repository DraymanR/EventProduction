// 'use client'

// import AddPost from "@/app/component/posts/AddPost";
// import PopUpWindow from "@/app/component/pop-upWindow";
// import { mapPostToPostCardProps } from "@/app/services/post/post";
// import useModalStore from "@/app/store/modelStore";
// import { useState } from "react";
// import useUserStore from "@/app/store/userModel";
// import PostCard from "@/app/component/posts/PostCard";
// import '@/app/globals.css'
// import { Post, PostCardProps } from "@/app/types/post";

// const Home: React.FC = () => {
//     const openModal = useModalStore((state: { openModal: any; }) => state.openModal);
//     const isModalOpen = useModalStore((state: { isModalOpen: any; }) => state.isModalOpen);
//     const postArr = useUserStore((state) => state.postArr);
//     const [MyEvents, setMyEvents] = useState<PostCardProps[]>(postArr);

//     const handleAddEvent = () => {
//         if (!isModalOpen) {
//             openModal();
//         }
//     };


//     return (
//         <div dir="ltr">
//             <PopUpWindow>
//                 <AddPost ></AddPost>
//             </PopUpWindow>

//             <div className="space-y-6 mt-4">
//                 <h2 className="page-title">:האירועים שלי</h2>
//                 {MyEvents.map((post: Post, index: number) => {
//                     const postCardProps = mapPostToPostCardProps(post); // המרת הפוסט
//                     return <PostCard key={index} post={postCardProps} />;
//                 })}
//             </div>
//             <button type="button" onClick={() => handleAddEvent()} className="button-primary">הוספת אירוע</button>

//         </div>
//     )
// }
// export default Home;



