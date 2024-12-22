'use client'

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import {  mapPostToPostCardProps } from "@/app/services/post/post";
import useModalStore from "@/app/store/modelPop-upWindow";
import { Post, PostCardProps } from "@/app/types/user";
import {  useState } from "react";
import useUserStore from "@/app/store/userModel";
import PostCard from "@/app/component/posts/PostCard";


const Home: React.FC = () => {
    const openModal = useModalStore((state: { openModal: any; }) => state.openModal);
    const isModalOpen = useModalStore((state: { isModalOpen: any; }) => state.isModalOpen);
    const postArr = useUserStore((state) => state.postArr);
    const [MyEvents, setMyEvents] = useState<Post[]>(postArr); 



    // useEffect(() => {
    //     const getMyPersonalDetails = async () => {
    //         try {
                
    //             const events = await getMyEvents();
    //             // const userData = convertToPosts(events.posts);
    //             console.log(events);

    //             setMyEvents(events); // מעדכן את המצב
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     getMyPersonalDetails()
    // }, [isModalOpen])

    const handleAddEvent = () => {
        if (!isModalOpen) {
            openModal();
        }
    };


    return (
        <div dir="ltr">
            <button type="button" onClick={() => handleAddEvent()} className=" bg-red-400 text-white py-2 px-4 rounded-lg">הוספת אירוע</button>
            <PopUpWindow>
                <AddPost ></AddPost>
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
