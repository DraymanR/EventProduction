"use client";

import { useEffect } from "react";
import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "@/app/store/modelStore";

const TimerComponent = () => {
    const openModal = useModalStore((state: { openModal: any; }) => state.openModal);
    const isModalOpen = useModalStore((state: { isModalOpen: any; }) => state.isModalOpen);
    const myUserName = decodeURIComponent(document.cookie)
    useEffect(() => {

        if (!myUserName && !isModalOpen) {
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
// import { useEffect, useState } from 'react';

// const TimerComponent = () => {
//   const [myUserName, setMyUserName] = useState<string | null>(null);

//   useEffect(() => {
//     // ודא שהקוד ירוץ רק בצד הלקוח
//     if (typeof document !== "undefined") {
//       const userNameFromCookie = decodeURIComponent(document.cookie);
//       setMyUserName(userNameFromCookie);
//     }
//   }, []);  // ריצה פעם אחת, לאחר שהקומפוננטה נטענה

//   return (
//     <div>
//       {/* מציג את שם המשתמש */}
//       {myUserName && <p>Welcome, {myUserName}</p>}
//     </div>
//   );
// };

// export default TimerComponent;
