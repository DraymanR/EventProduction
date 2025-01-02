'use client';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { checkIfLoggedIn } from '@/app/services/user/registerUser';
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import useModalStore from '../store/modelStore';
import Logo from '@/app/assets/images/logo.png';

import { useState } from 'react';

const Navbar = () => {
  const openModal = useModalStore((state) => state.openModal);
  const userDetails = useUserStore((state) => state.user);
  const { toggleNavbar } = useNavbarStore();
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);

  const handleProfileClick = () => {
    if (checkIfLoggedIn()) {
      setOpenSideBar(!openSideBar)
      toggleNavbar(openSideBar);
    } else {
      openModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-[#6C48C5] shadow-md z-50 h-[105px]">
      <nav className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto relative h-full">
        {/* Profile Section - Right aligned but vertically centered */}
        <div
          className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
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
              <span className="text-[#101f61] text-sm font-medium font-bold" >{userDetails.firstName} {userDetails.lastName}</span>
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