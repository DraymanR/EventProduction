'use client'
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import "@/app/css/customNavbar.css";
import { checkIfLoggedIn } from '@/app/services/user/registerUser'
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import useModalStore from '../store/modelStore';
import { useState } from 'react';

const Navbar = () => {
  const openModal = useModalStore((state) => state.openModal);
  const userDetails = useUserStore((state) => state.user);
  const { toggleNavbar } = useNavbarStore(); // גישה ל-store
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);

  const handleProfileClick = () => {
    if (checkIfLoggedIn()) {
      // המשתמש מחובר - נפתח את הצדדי
      setOpenSideBar(!openSideBar)
      toggleNavbar(openSideBar);
    } else {
      // המשתמש לא מחובר - ננווט לחלון ההרשמה
      openModal();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md h-[120px] flex items-center justify-between px-4 pt-4 pb-4">
      {/* אזור תמונת הפרופיל והכיתוב */}
      <div className="flex items-center space-x-8 cursor-pointer" onClick={handleProfileClick}>
        {checkIfLoggedIn() && userDetails?.profileImage ? (
          <img
            src={userDetails.profileImage}
            alt="Profile"
            width={80} // גודל התמונה
            height={80} // גובה התמונה
            className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
        ) : (
          <Image
            src={profileImage}
            alt="תמונת פרופיל"
            width={80} // גודל התמונה
            height={80} // גובה התמונה
            className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
        )}
        <div>
          {checkIfLoggedIn() && userDetails ? (
            <span className="text-red-500 font-bold ml-4">{userDetails.firstName} {userDetails.lastName}</span>
          ) : (
            <span className="ml-2 text-red-500 font-bold">הפרופיל שלי</span>
          )}
        </div>
      </div>
      {/* לוגו */}
      <h1 className="text-xl font-bold text-red-500">חגיגה מושלמת</h1>
    </header>

  );
};

export default Navbar;
