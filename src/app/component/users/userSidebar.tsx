'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Link from 'next/link';
import { logout } from '../../services/user/registerUser';
import { useRouter } from 'next/navigation';



const ConsumerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  // פונקציה לטיפול בלחיצה על תמונת הפרופיל
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const exite = async () => {
    await logout()
    router.push('/');

  };

  return (
    <div className="fixed top-[100px] right-0 w-64 bg-gray-100 shadow-lg border h-auto">
      {/* תמונת הפרופיל */}
      <div className="p-4 flex flex-col items-center cursor-pointer" onClick={toggleNavbar}>
        <Image
          src={profileImage}
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
            תיבת הודעות
          </a>
        </div>
      )}
    </div>
  );
};

export default ConsumerNavbar;
