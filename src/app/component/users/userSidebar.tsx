'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import useNavbarStore from '@/app/store/navbarStore';
import useUserStore from '@/app/store/userModel';
import { logout } from '@/app/services/user/registerUser';
import "@/app/css/customNavbar.css";

const ConsumerNavbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const clearUser = useUserStore((state) => state.clearUser);
  const { isOpen } = useNavbarStore(); // גישה ל-store
  const { toggleNavbar } = useNavbarStore(); // גישה ל-store

  if (!isOpen) return null; // אם ה-navbar סגור, לא להציג כלום

  const exite = async () => {
    if (session?.user) {
      await signOut({ redirect: false });
      await logout();
      toggleNavbar(false)
    } else {
      await logout();
      toggleNavbar(false)

    }

    clearUser();
    router.push('/');
  };

  return (
    <div className="consumer-navbar">
      <button type="button" onClick={exite} className="consumer-navbar-button">
        יציאה
      </button>
      <Link href="/pages/user-account" className="consumer-navbar-link">
        🏠 דף הבית
      </Link>
      <Link href="/pages/user-account/personal-details" className="consumer-navbar-link">
        פרטים אישיים
      </Link>
      <Link href="/pages/user-account/my-events" className="consumer-navbar-link">
        האירועים שלי
      </Link>
      <Link href="/pages/user-account/favorite-event" className="consumer-navbar-link">
        האירועים שאהבתי
      </Link>
      <Link href="/pages/user-account/reminders" className="consumer-navbar-link">
        התזכורות שלי
      </Link>
      <Link href="/pages/user-account/message-box" className="consumer-navbar-link">
        תיבת הודעות
      </Link>
    </div>
  );
};

export default ConsumerNavbar;
