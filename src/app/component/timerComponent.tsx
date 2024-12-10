"use client";

import { useEffect, useState } from "react";

import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "@/app/store/modelStore";

const TimerComponent = () => {
    const openModal = useModalStore((state: { openModal: any; }) => state.openModal);
    const isModalOpen = useModalStore((state: { isModalOpen: any; }) => state.isModalOpen);
    const [myUserName, setMyUserName] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const userNameFromCookie = decodeURIComponent(document.cookie);
        setMyUserName(userNameFromCookie);

        if (!userNameFromCookie && !isModalOpen) {
            openModal(); // הצגת המודל בתחילת השימוש
        }

        const intervalId = setInterval(() => {
            const userNameFromCookie = decodeURIComponent(document.cookie);
            if (!userNameFromCookie) {
                openModal(); // הפעלת פעולה כל פרק זמן מוגדר
            }
        }, 120000); // 2 דקות

        return () => clearInterval(intervalId); // ניקוי ה-timer בזמן הסרת הקומפוננטה
    }, []);

    if (!isClient) {
        return null; // מחזיר null או קומפוננטה אחרת בזמן שהדף נטען בצד השרת
    }

    return (
        <div>
            <PopUpWindow>
                <Login />
            </PopUpWindow>
        </div>
    );
};

export default TimerComponent;
