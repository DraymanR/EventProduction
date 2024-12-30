'use client';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { checkIfLoggedIn } from '@/app/services/user/registerUser';
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import { UserFormData } from '../types/user';
import useModalStore from '../store/modelStore';
import Logo from '@/app/assets/images/logo.png';
import { useState } from 'react';

// const Navbar = () => {
//   const openModal = useModalStore((state) => state.openModal);
//   const userDetails = useUserStore((state) => state.user);
//   const { toggleNavbar } = useNavbarStore();
//   const [openSideBar, setOpenSideBar] = useState<boolean>(true);

//   const handleProfileClick = () => {
//     if (checkIfLoggedIn()) {
//       // המשתמש מחובר - נפתח את הצדדי
//       setOpenSideBar(!openSideBar)
//       toggleNavbar(openSideBar);
//     } else {
//       openModal();
//     }
//   };

//   // const isUserFormData = (data: unknown): data is UserFormData => {
//   //   return typeof (data as UserFormData)?.profileImage === 'string';
//   // };

//   return (
//     <div className="fixed top-0 left-0 right-0 w-full bg-[#FFFDEC] shadow-md z-50">
//       <nav className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
//         {/* Profile Section */}
//         <div
//           className="flex items-center space-x-3 cursor-pointer"
//           onClick={handleProfileClick}
//         >
//           {checkIfLoggedIn() &&  userDetails?.profileImage ? (
//             <img
//               src={userDetails.profileImage}
//               alt="Profile"
//               width={50}
//               height={50}
//               className="rounded-full border-2 border-[#86A788]"
//             />
//           ) : (
//             <Image
//               src={profileImage}
//               alt="Profile"
//               width={50}
//               height={50}
//               className="rounded-full border-2 border-[#86A788]"
//             />
//           )}
//                   <div>
//           {checkIfLoggedIn() && userDetails ? (
//             <span className="text-gray-700 text-sm font-medium">{userDetails.firstName} {userDetails.lastName}</span>
//           ) : (
//             <span className="text-gray-700 text-sm font-medium">הפרופיל שלי</span>
//           )}
//         </div>
//         </div>

//         {/* Logo */}
//         <div>
//           <Image
//             src={Logo}
//             alt="חגיגה מושלמת Logo"
//             height={48}
//             width={150}
//             priority
//             className="hover:opacity-90 transition-opacity"
//           />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


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
    <div className="fixed top-0 left-0 right-0 w-full bg-[#FFFDEC] shadow-md z-50">
      <nav className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
        {/* Profile Section */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleProfileClick}
        >
          {checkIfLoggedIn() && userDetails?.profileImage ? (
            <img
              src={userDetails.profileImage}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full border-2 border-[#86A788] mb-2"
            />
          ) : (
            <Image
              src={profileImage}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full border-2 border-[#86A788] mb-2"
            />
          )}
          <div className="text-center">
            {checkIfLoggedIn() && userDetails ? (
              <span className="text-gray-700 text-sm font-medium">{userDetails.firstName} {userDetails.lastName}</span>
            ) : (
              <span className="text-gray-700 text-sm font-medium">הפרופיל שלי</span>
            )}
          </div>
        </div>

        {/* Logo */}
        <div>
          <Image
            src={Logo}
            alt="חגיגה מושלמת Logo"
            height={48}
            width={150}
            priority
            className="hover:opacity-90 transition-opacity"
          />
        </div>
      </nav>
    </div>
  );
};
export default Navbar ;