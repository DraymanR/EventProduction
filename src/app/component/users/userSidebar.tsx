
'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import useNavbarStore from '@/app/store/navbarStore';
import useUserStore from '@/app/store/userModel';
import { logout } from '@/app/services/user/registerUser';
import "@/app/css/customNavbar.css";
import {
  Home,
  User,
  Calendar,
  Heart,
  Bell,
  MessageSquare,
  LogOut,
  Menu
} from 'lucide-react';

const ConsumerNavbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const clearUser = useUserStore((state) => state.clearUser);
  const { isOpen } = useNavbarStore();
  const { toggleNavbar } = useNavbarStore();

  const exite = async () => {
    if (session?.user) {
      await signOut({ redirect: false });
      await logout();
      toggleNavbar(false)
      toggleNavbar(false)
    } else {
      await logout();
      toggleNavbar(false)

      toggleNavbar(false)

    }

    clearUser();
    router.push('/');
  };

  if (!isOpen) return null; // אם ה-navbar סגור, לא להציג כלום

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        <Menu className="navbar-menu-icon" size={24} />
        <h2 className="navbar-title">תפריט ניווט</h2>
      </div>
      <nav className="navbar-links">

        <Link href="/pages/user-account" className="navbar-link">
          דף הבית
          <Home size={20} className="navbar-icon" />
        </Link>
        <Link href="/pages/user-account/personal-details" className="navbar-link">
          פרטים אישיים
          <User size={20} className="navbar-icon" />
        </Link>
        <Link href="/pages/user-account/my-events" className="navbar-link">
          האירועים שלי
          <Calendar size={20} className="navbar-icon" />
        </Link>
        <Link href="/pages/user-account/favorite-event" className="navbar-link">
          האירועים שאהבתי
          <Heart size={20} className="navbar-icon" />
        </Link>
        <Link href="/pages/user-account/reminders" className="navbar-link">
          התזכורות שלי
          <Bell size={20} className="navbar-icon" />
        </Link>
        <Link href="/pages/user-account/message-box" className="navbar-link">
          תיבת הודעות
          <MessageSquare size={20} className="navbar-icon" />
        </Link>
      </nav>
      <div className="navbar-footer">
        <button onClick={exite} className="navbar-logout">
          יציאה
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConsumerNavbar;
