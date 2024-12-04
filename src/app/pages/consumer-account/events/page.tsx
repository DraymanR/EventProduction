'use client'

import FavoriteEvent from "@/app/component/FavoriteEvent";
import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import { getMyEvents } from "@/app/services/post/post";
import { Post, UserFormData } from "@/app/types/user";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [MyEvents, setMyEvents] = useState<Post[]>(); //  אם אנחנו בשלב הזנת קוד

    // const convertToPosts = (data: any): Post[] => {
    //     return {
    //         createDate: data.createDate || "",
    //         userName: data.userName || "",
    //         userName: data.userName || "",
    //         email: data.email || "",
    //         password: "", // שדה סיסמה כנראה לא יגיע מהשרת
    //         title: data.title || "consumer", // ערך ברירת מחדל אם אין
    //         phone: data.phone || "",
    //         description: data.description || "",
    //         language: data.language || "Hebrew",
    //         address: {
    //             zipCode: data.zipCode || "",
    //             city: data.city || "",
    //             street: data.street || "",
    //             building: data.building || 0,
    //         },
    //         supplierDetails: data.supplierDetails
    //             ? {
    //                 startingPrice: data.supplierDetails.startingPrice || 0,
    //                 topPrice: data.supplierDetails.topPrice || 0,
    //                 eventList: data.supplierDetails.eventList || [],
    //                 recommendation: data.supplierDetails.recommendation || [],
    //                 range: data.supplierDetails.range || 0,
    //                 emptyDate: data.supplierDetails.emptyDate || [],
    //                 images: data.supplierDetails.images || [],
    //                 description: data.supplierDetails.description || "",
    //             }
    //             : undefined,
    //     };
    // };

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
    }, [])

    return (
        <div dir="ltr">
            {/* {MyEvents ? (
            //     // <FavoriteEvent favoritePosts={MyEvents} />
            // ) : (
            //     <p>Loading...</p> // הודעת טעינה אם הנתונים אינם מוכנים
            )} */}
        </div>

    )
}
export default Home;
