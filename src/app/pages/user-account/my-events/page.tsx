'use client'

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import { getMyEvents } from "@/app/services/post/post";
import useModalStore from "@/app/store/modelStore";
import { Post, PostCardProps } from "@/app/types/user";
import { useEffect, useState } from "react";
import FavoriteEvent from "@/app/component/users/FavoriteEvent";


const Home: React.FC = () => {
    const [MyEvents, setMyEvents] = useState<PostCardProps[]>(); //  אם אנחנו 
    const openModal = useModalStore((state: { openModal: any; }) => state.openModal);
    const isModalOpen = useModalStore((state: { isModalOpen: any; }) => state.isModalOpen);

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            try {
                const events = await getMyEvents();
                // const userData = convertToPosts(events.posts);
                console.log(events);

                setMyEvents(events); // מעדכן את המצב
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [isModalOpen])

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
            {MyEvents && (
                <FavoriteEvent favoritePosts={MyEvents} ></FavoriteEvent>
            )}
        </div>

    )
}
export default Home;
