'use client'
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import "@/app/css/customNavbar.css";
import { checkIfLoggedIn } from '@/app/services/user/registerUser'
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import { UserFormData } from '../types/user';
import useModalStore from '../store/modelStore';

const Navbar = () => {
    const openModal = useModalStore((state) => state.openModal);
    const userDetails = useUserStore((state) => state.user);
    
    const { toggleNavbar } = useNavbarStore();

    const handleProfileClick = () => {
        if (checkIfLoggedIn()) {
            console.log("User is logged in");
            toggleNavbar()
        } else {
            console.log("User is not logged in");
            openModal();
        }
    };

    // Type Guard
    const isUserFormData = (data: unknown): data is UserFormData => {
        return typeof (data as UserFormData)?.profileImage === 'string';
    };

    // Helper function to safely parse profile image URL
    const getProfileImageUrl = (profileImage: string): string => {
        try {
            // Debug log
            console.log('Raw profile image data:', profileImage);
            
            if (!profileImage) {
                return '';
            }

            const parsed = JSON.parse(
                profileImage
                    .replace(/'/g, '"')  // Replace single quotes with double quotes
                    .replace(/new ObjectId\(([^)]+)\)/g, '"$1"')  // Handle ObjectId
            );

            if (!parsed || !parsed.imgUrl) {
                console.error('Invalid profile image data structure:', parsed);
                return '';
            }

            return parsed.imgUrl;
        } catch (error) {
            console.error('Error parsing profile image:', error);
            return '';
        }
    };

    const renderProfileImage = () => {
        if (checkIfLoggedIn() && isUserFormData(userDetails) && userDetails.profileImage) {
            const imageUrl = getProfileImageUrl(userDetails.profileImage);
            
            if (!imageUrl) {
                return (
                    <Image
                        src={profileImage}
                        alt="תמונת פרופיל"
                        width={50}
                        height={50}
                        className="profile-image"
                    />
                );
            }

            return (
                <img
                    src={imageUrl}
                    alt="Profile"
                    width={50}
                    height={50}
                    className="profile-image"
                />
            );
        }

        return (
            <Image
                src={profileImage}
                alt="תמונת פרופיל"
                width={50}
                height={50}
                className="profile-image"
            />
        );
    };

    return (
        <div className="navbar">
            <nav className="navbar-container">
                {/* Profile section on the right */}
                <div className="profile-section">
                    <div
                        className="profile-image-container"
                        onClick={handleProfileClick}
                    >
                        {renderProfileImage()}
                        <p className="profile-text">הפרופיל שלי</p>
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