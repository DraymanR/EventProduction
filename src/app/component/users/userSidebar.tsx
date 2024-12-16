'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import useUserStore from '../../store/userModel' ;
import { logout } from '../../services/user/registerUser';

const ConsumerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const clearUser = useUserStore((state) => state.clearUser);


  // פונקציה לטיפול בלחיצה על תמונת הפרופיל
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  
  const exite = async () => {
    if (session?.user) {
      // If logged in via Google (NextAuth)
      await signOut({ 
        redirect: false  // Prevent automatic redirection
      });
    } else {
      // If logged in via regular authentication
      await logout();
    }
    
    // Navigate to home page
    router.push('/');
  };

  return (
    <div className="fixed top-[100px] right-0 w-64 bg-gray-100 shadow-lg border h-auto">
      <div className="p-4 flex flex-col items-center cursor-pointer" onClick={toggleNavbar}>
        <img
          src={"https://res.cloudinary.com/dtmyfpazp/image/upload/v1733824430/ftu1bxpgu4wnrzs0iozk.jpg"}
          alt="תמונת פרופיל"
          width={80}
          height={80}
          className="rounded-full border"
        />

        <button
          type="button"
          onClick={exite}
          className="text-red-300 underline bg-transparent border-none cursor-pointer"
        >
          יציאה
        </button>
      </div>

      {isOpen && (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <Link href="/pages/user-account/personal-details" className="block text-gray-600 hover:text-red-400">
            פרטים אישיים
          </Link>
          <Link href="/pages/user-account/my-events" className="block text-gray-600 hover:text-red-400">
            האירועים שלי
          </Link>
          <Link href="/pages/user-account/favorite-event" className="block text-gray-600 hover:text-red-400">
            האירועים שאהבתי
          </Link>
          <Link href="/pages/user-account/reminders" className="block text-gray-600 hover:text-red-400">
            התזכורות שלי
          </Link>
          <Link href="/pages/user-account/message-box" className="block text-gray-600 hover:text-red-400">
            תיבת הודעות
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConsumerNavbar;