"use client";

import { useEffect } from "react";
import PopUpWindow from "./pop-upWindow";
import Login from "./login";
import useModalStore from "@/app/store/modelStore";
import useMyUser from "../store/users";

const TimerComponent = () => {
    const openModal = useModalStore((state) => state.openModal);
    const myUserName = useMyUser((state) => state.userName);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!myUserName) {
            // if (!token) {
            openModal(); // הצגת המודל בתחילת השימוש
        }

        const intervalId = setInterval(() => {
            if (!myUserName) {
                openModal(); // הפעלת פעולה כל פרק זמן מוגדר
            }
        }, 120000); // 2 דקות

        return () => clearInterval(intervalId); // ניקוי ה-timer בזמן הסרת הקומפוננטה
    }, []);

    return (
        <div>
            <PopUpWindow>
                <Login></Login>
            </PopUpWindow>
        </div>
    )
};

export default TimerComponent;
