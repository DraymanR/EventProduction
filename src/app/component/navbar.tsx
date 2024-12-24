'use client'
import useModalStore from '@/app/store/modelPop-upWindow';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import "@/app/css/customNavbar.css";
import { checkIfLoggedIn } from '@/app/services/user/registerUser'
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import { UserFormData } from '../types/user';


const Navbar = () => {
    const openModal = useModalStore((state) => state.openModal);
    const userDetails = useUserStore((state) => state.user);

    const { toggleNavbar } = useNavbarStore(); // גישה ל-store

    const handleProfileClick = () => {
        console.log("i am");


        if (checkIfLoggedIn()) {
            // המשתמש מחובר - נפתח את הצדדי
            console.log(checkIfLoggedIn());

            toggleNavbar()
        } else {
            console.log("לא מחובר");

            // המשתמש לא מחובר - ננווט לחלון ההרשמה
            openModal();
        }
    };

    // פונקציית Type Guard לבדיקה אם userDetails הוא מסוג UserFormData
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
                        {checkIfLoggedIn() && isUserFormData(userDetails) && userDetails.profileImage ? (
                            <Image
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
                        <p className="profile-text">הפרופיל שלי</p>
                    </div>
                </div>

                {/* כותרת בצד שמאל */}
                <div className="navbar-title">
                    חגיגה מושלמת
                </div>
            </nav>
        </div>
    );
};

export default Navbar;