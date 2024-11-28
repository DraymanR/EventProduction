"use client";

import { useEffect } from "react";
import PopUpWindow from "./pop-upWindow";
import Login from "./login";
import useModalStore from "@/app/store/modelStore";

const TimerComponent = () => {
    const openModal = useModalStore((state) => state.openModal);
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            openModal(); // הצגת המודל בתחילת השימוש
        }

        const intervalId = setInterval(() => {
            if (!token) {
                openModal(); // הפעלת פעולה כל פרק זמן מוגדר
            }
        }, 120000); // 2 דקות

        return () => clearInterval(intervalId); // ניקוי ה-timer בזמן הסרת הקומפוננטה
    }, [openModal]);

    return (
        <div>
            <PopUpWindow>
                <Login></Login>
            </PopUpWindow>
        </div>
    )
};

export default TimerComponent;
