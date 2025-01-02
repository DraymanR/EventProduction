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
      toggleNavbar(false);
      toggleNavbar(false);
    } else {
      await logout();
      toggleNavbar(false);
      toggleNavbar(false);
    }

    clearUser();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-64 shadow-lg z-50 flex flex-col" style={{ backgroundColor: '#86A788' }}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/20">
        <Menu className="h-6 w-6 text-white" />
        <h2 className="text-xl font-semibold text-white">תפריט ניווט</h2>
      </div>

      {/* Navigation Links - Added top padding to prevent navbar overlap */}
      <nav className="flex-1 pt-16 px-4 space-y-4 overflow-y-auto">
        <Link href="/pages/user-account" 
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">דף הבית</span>
          <Home className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/personal-details"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">פרטים אישיים</span>
          <User className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/my-events"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">האירועים שלי</span>
          <Calendar className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/favorite-event"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">האירועים שאהבתי</span>
          <Heart className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/reminders"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">התזכורות שלי</span>
          <Bell className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/message-box"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">תיבת הודעות</span>
          <MessageSquare className="h-6 w-6" />
        </Link>
        <button 
          onClick={exite}
          className="flex items-center justify-end gap-3 w-full p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg">יציאה</span>
          <LogOut className="h-6 w-6" />
        </button>
      </nav>

    </div>
  );
};

export default ConsumerNavbar;
