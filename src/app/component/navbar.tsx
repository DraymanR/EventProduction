'use client';

import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { checkIfLoggedIn } from '@/app/services/user/registerUser';
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import useModalStore from '../store/modelStore';
import Logo from '@/app/assets/images/logo.png';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Home, Info, Link, LogIn } from 'lucide-react';

const Navbar = () => {
  const userDetails = useUserStore((state) => state.user);
  const { toggleNavbar } = useNavbarStore();
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  const openModal = useModalStore((state) => state.openModal);

  const handleLoginClick = () => {
    if (checkIfLoggedIn()) {
      Swal.fire({
        title: 'כבר מחובר',
        text: 'אתה כבר מחובר לחשבון משתמש, לאחר יציאה ניתן להתחבר שוב.',
        icon: 'info',
        confirmButtonText: 'הבנתי'
      });
    } else {
      openModal();
    }
  };

  const handleProfileClick = () => {
    if (checkIfLoggedIn()) {
      setOpenSideBar(!openSideBar);
      toggleNavbar(openSideBar);
    } else {
      openModal();
    }
  };


  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-[#6C48C5] shadow-md z-50 h-[105px]">
      <nav className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto relative h-full">
        {/* Logo - Now positioned on the left */}
        <div className="order-2">
          <Image
            src={Logo}
            alt="חגיגה מושלמת Logo"
            height={48}
            width={130}
            priority
            className="hover:opacity-90 transition-opacity"
          />
        </div>


          {/* Profile Section - Remains on the right */}
          <div
            className="order-1 flex flex-col items-center cursor-pointer"
            onClick={handleProfileClick}
          >
            {checkIfLoggedIn() && userDetails?.profileImage ? (
              <img
                src={userDetails.profileImage}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#101f61] mb-2"
              />
            ) : (
              <Image
                src={profileImage}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#101f61] mb-2"
              />
            )}
            <div className="text-center">
              {checkIfLoggedIn() && userDetails ? (
                <span className="text-[#101f61] text-sm font-medium font-bold">
                  {userDetails.firstName} {userDetails.lastName}
                </span>
              ) : (
                <span className="text-[#101f61] text-sm font-medium font-bold">הפרופיל שלי</span>
              )}
            </div>
          </div>
      </nav>
    </div>
  );
};


export default Navbar;