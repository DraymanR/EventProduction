<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import Image from "next/image";
import profileImage from "@/app/assets/images/defaultConsumerProfile.png";
import Link from "next/link";
import { getUserDetails } from "@/app/services/user/getDetails";
import { logout } from "../../services/user/registerUser";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/store/userModel";
=======
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Link from 'next/link';
import { getUserDetails } from '@/app/services/user/getDetails'
import { logout } from '../../services/user/registerUser';
import { useRouter } from 'next/navigation';
import useUserStore from '@/app/store/userModel';


>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a

const ConsumerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
<<<<<<< HEAD
  const clearUser = useUserStore((state) => state.clearUser);

=======
  const { data: session } = useSession();
  const clearUser = useUserStore((state) => state.clearUser);


>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
  // פונקציה לטיפול בלחיצה על תמונת הפרופיל
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
<<<<<<< HEAD
  const exite = async () => {
    await logout();
    clearUser();
    router.push("/");
=======
  
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
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
  };

  return (
    <div className="fixed top-[100px] right-0 w-64 bg-gray-100 shadow-lg border h-auto">
      {/* תמונת הפרופיל */}
<<<<<<< HEAD
      <div
        className="p-4 flex flex-col items-center cursor-pointer"
        onClick={toggleNavbar}
      >
        <img
          src={
            "https://res.cloudinary.com/dtmyfpazp/image/upload/v1733824430/ftu1bxpgu4wnrzs0iozk.jpg"
          }
=======
      <div className="p-4 flex flex-col items-center cursor-pointer" onClick={toggleNavbar}>
        {/* <Image
          src={profileImage} */}

        <img
          // src={profileImage}
           src={"https://res.cloudinary.com/dtmyfpazp/image/upload/v1733824430/ftu1bxpgu4wnrzs0iozk.jpg"}
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
          alt="תמונת פרופיל"
          width={80}
          height={80}
          className="rounded-full border"
        />

        <button
          type="button"
          onClick={() => exite()} // לוחץ על כפתור זה יעביר לשלב איפוס סיסמה
          className="text-red-300 underline bg-transparent border-none cursor-pointer"
        >
          יציאה
        </button>
        {/* <Link href="/" className="text-red-300 underline">יציאה</Link> */}
      </div>

      {/* לינקים בתפריט - יפתחו רק אם isOpen === true */}
      {isOpen && (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
<<<<<<< HEAD
          <a
            href="/pages/user-account/personal-details"
            className="block text-gray-600 hover:text-red-400"
          >
            פרטים אישיים
          </a>
          <a
            href="/pages/user-account/my-events"
            className="block text-gray-600 hover:text-red-400"
          >
            האירועים שלי
          </a>
          <a
            href="/pages/user-account/favorite-event"
            className="block text-gray-600 hover:text-red-400"
          >
            האירועים שאהבתי
          </a>
          <a
            href="/pages/user-account/reminders"
            className="block text-gray-600 hover:text-red-400"
          >
            התזכורות שלי
          </a>
          <a
            href="/pages/user-account/message-box"
            className="block text-gray-600 hover:text-red-400"
          >
=======
          <a href="/pages/user-account/personal-details" className="block text-gray-600 hover:text-red-400">
            פרטים אישיים
          </a>
          <a href="/pages/user-account/my-events" className="block text-gray-600 hover:text-red-400">
            האירועים שלי
          </a>
          <a href="/pages/user-account/favorite-event" className="block text-gray-600 hover:text-red-400">
            האירועים שאהבתי
          </a>
          <a href="/pages/user-account/reminders" className="block text-gray-600 hover:text-red-400">
            התזכורות שלי
          </a>
          <a href="/pages/user-account/message-box" className="block text-gray-600 hover:text-red-400">
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
            תיבת הודעות
          </a>
        </div>
      )}
    </div>
  );
};

export default ConsumerNavbar;
