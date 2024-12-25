'use client';  // זה מציין שזו קומפוננטת צד לקוח

import { useState, useEffect } from 'react';
import useNavbarStore from '@/app/store/navbarStore'; // גישה ל-store
import ConsumerSidebar from '@/app/component/users/userSidebar'; // תפריט צד
import "@/app/globals.css";


const ClientSideLayout = () => {
    // const [isOpen, setIsOpen] = useState(false); // מצב מקומי בצד לקוח
    const { isOpen } = useNavbarStore(); // גישה ל-store

    // useEffect(() => {
    //     setIsOpen(isOpen); // עדכון המצב
    // }, []);

    return (
        <div>
            {isOpen &&
                <div className="sidebar" >
                    <ConsumerSidebar />
                </div>
            } {/* הצגת התפריט רק אם הוא פתוח */}
        </div>
    );
}
export default ClientSideLayout