'use client'
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import "@/app/css/customNavbar.css";
import { checkIfLoggedIn } from '@/app/services/user/registerUser'
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import { UserFormData } from '../types/user';
import useModalStore from '../store/modelStore';
import { useState } from 'react';

const Navbar = () => {
    const openModal = useModalStore((state) => state.openModal);
    const userDetails = useUserStore((state) => state.user);
    const { toggleNavbar } = useNavbarStore(); // גישה ל-store

    const [openSideBar, setOpenSideBar] = useState<boolean>(true);
    const handleProfileClick = () => {
        console.log("i am");

        if (checkIfLoggedIn()) {
            // המשתמש מחובר - נפתח את הצדדי
            console.log("User is logged in");
            setOpenSideBar(!openSideBar)
            toggleNavbar(openSideBar);
        } else {
            console.log("User is not logged in");
            // המשתמש לא מחובר - ננווט לחלון ההרשמה
            openModal();
        }
    };

    // Type Guard
    const isUserFormData = (data: unknown): data is UserFormData => {
        return typeof (data as UserFormData)?.profileImage === 'string';
    };


    return (
        <div className="navbar">
            <nav className="navbar-container">
                {/* אזור הפרופיל בצד ימין */}
                <div className="profile-section">
                    <div
                        className="profile-image-container"
                        onClick={() => { handleProfileClick() }}
                    >
                        {checkIfLoggedIn() && userDetails?.profileImage ? (
                            // {checkIfLoggedIn() && isUserFormData(userDetails) && userDetails.profileImage ? (
                            <img
                                src={userDetails.profileImage}
                                alt="Profile"
                                width={50}
                                height={50}
                                className="profile-image"
                            />
                        ) : (
                            <Image
                                src={profileImage}
                                alt="תמונת פרופיל"
                                width={50}
                                height={50}
                                className="profile-image"
                            />
                        )}
                        {checkIfLoggedIn() && userDetails ? (
                            <p className="profile-text">{userDetails.firstName} {userDetails.lastName}</p>
                        ) : (
                            <p className="profile-text">הפרופיל שלי</p>
                        )}
                    </div>
                </div>

                {/* Title on the left */}
                <div className="navbar-title">
                    חגיגה מושלמת
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
