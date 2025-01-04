'use client';

import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { checkIfLoggedIn, updateUserStore } from '@/app/services/user/registerUser';
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import useModalStore from '../store/modelStore';
import Logo from '@/app/assets/images/logo.png';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getMyDetails, getUserDetails } from '@/app/services/user/getDetails';
import { Home, Info, Link, LogIn } from 'lucide-react';
import { UserFormData } from '../types/user';

const Navbar = () => {
  let userDet = useUserStore((state) => state.user);
  const { toggleNavbar } = useNavbarStore();
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  const openModal = useModalStore((state) => state.openModal);
  const storeUser = useUserStore((state) => state.user);
  useEffect(() => {
    const getMyPersonalDetails = async () => {
      toggleNavbar(true)
      if (useUserStore.getState().isReady) return; // הימנע משאילתת נתונים כפולה
      if (storeUser) return;
      try {
        const userDetails = await getMyDetails();
        const user: UserFormData = {
          firstName: userDetails.user.firstName,
          lastName: userDetails.user.lastName,
          userName: userDetails.user.userName,
          email: userDetails.user.email,
          password: '',
          titles: userDetails.user.titles,
          phone: userDetails.user.phone,
          languages: userDetails.user.languages,
          address: { ...userDetails.user.addressId },
          description: userDetails.user.description,
          profileImage: userDetails.user.profileImage,
        };
        updateUserStore(
          user,
          userDetails.user.likedPostsArr,
          userDetails.user.likedPeople,
          userDetails.user.postArr
        );
        userDet=userDetails.user;
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }

    const userName = checkIfLoggedIn();
    if (!userDet && userName) {
      console.log("before",userDet);
      getMyPersonalDetails()
    }
 
    console.log("hbh",userDet);
    }, [userDet])
  // const handleLoginClick = async () => {
  //   const cookies = document.cookie.split('; ');
  //   const token = cookies.find((row) => row.startsWith('token='))?.split('=')[1];
  //   const userName = cookies.find((row) => row.startsWith('username='))?.split('=')[1];

  //   if (checkIfLoggedIn()) {
  //     if (!userDetails && token && userName) {
  //       try {
  //         // שליפת פרטי המשתמש באמצעות הפונקציה שלך
  //         const userData = await getUserDetails(userName);
  //         if (userData) {
  //           Swal.fire({
  //             title: 'ברוך הבא',
  //             text: `שלום ${userData.user.firstName}, פרטי המשתמש שלך עודכנו!`,
  //             icon: 'success',
  //             confirmButtonText: 'הבנתי',
  //           });
  //         }
  //       } catch (error) {
  //         console.error('Error fetching user details:', error);
  //         Swal.fire({
  //           title: 'שגיאה',
  //           text: 'לא הצלחנו לעדכן את פרטי המשתמש. נסה שוב מאוחר יותר.',
  //           icon: 'error',
  //           confirmButtonText: 'סגור',
  //         });
  //       }
  //     } else {
  //       Swal.fire({
  //         title: 'כבר מחובר',
  //         text: 'אתה כבר מחובר לחשבון משתמש, לאחר יציאה ניתן להתחבר שוב.',
  //         icon: 'info',
  //         confirmButtonText: 'הבנתי',
  //       });
  //     }
  //   } else {
  //     openModal();
  //   }
  // };

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
          {checkIfLoggedIn() && userDet?.profileImage ? (
            <img
              src={userDet.profileImage}
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
            {checkIfLoggedIn() && userDet ? (
              <span className="text-[#101f61] text-sm font-medium font-bold">
                {userDet.firstName} {userDet.lastName}
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

