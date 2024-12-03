"use client";

import { useEffect } from "react";
import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "@/app/store/modelStore";

const TimerComponent = () => {
    const openModal = useModalStore((state) => state.openModal);
    const myUserName = decodeURIComponent(document.cookie)
    useEffect(() => {

        if (!myUserName) {
            openModal(); // הצגת המודל בתחילת השימוש
        }

        const intervalId = setInterval(() => {
            const myUserName = decodeURIComponent(document.cookie)
            if (!myUserName) {
                openModal(); // הפעלת פעולה כל פרק זמן מוגדר
            }
        }, 120000); // 2 דקות

        return () => clearInterval(intervalId); // ניקוי ה-timer בזמן הסרת הקומפוננטה
    }, [myUserName, openModal]);

    return (
        <div>
            <PopUpWindow>
                <Login></Login>
            </PopUpWindow>
        </div>
    )
};

export default TimerComponent;
