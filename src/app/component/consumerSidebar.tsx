'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import profileImage from '@/app/assets/images/defaltConsumerProfile.png';
import Link from 'next/link';

const ConsumerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  // פונקציה לטיפול בלחיצה על תמונת הפרופיל
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-[64px] right-0 w-64 bg-gray-100 shadow-lg border h-auto">
      {/* תמונת הפרופיל */}
      <div className="p-4 flex flex-col items-center cursor-pointer" onClick={toggleNavbar}>
        <Image
          src={profileImage}
          alt="תמונת פרופיל"
          width={80}
          height={80}
          className="rounded-full border"
        />
        <p className="mt-2 text-center font-medium text-red-400">הפרופיל שלי</p>
        <Link href="/" className="text-red-300 underline">יציאה</Link>
      </div>

      {/* לינקים בתפריט - יפתחו רק אם isOpen === true */}
      {isOpen && (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          <a href="/pages/consumer-account/personal-details" className="block text-gray-600 hover:text-red-400">
            פרטים אישיים
          </a>
          <a href="/pages/consumer-account/events" className="block text-gray-600 hover:text-red-400">
            האירועים שלי
          </a>
          <a href="/pages/consumer-account/reminders" className="block text-gray-600 hover:text-red-400">
            התזכורות שלי
          </a><a href="/pages/consumer-account/message-box" className="block text-gray-600 hover:text-red-400">
            תיבת הודעות
          </a>
        </div>
      )}
    </div>
  );
};

export default ConsumerNavbar;
