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
    console.log("userDetails", userDetails);


    const { toggleNavbar } = useNavbarStore(); // גישה ל-store

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
    if (checkIfLoggedIn() && isUserFormData(userDetails) && userDetails.profileImage) {

        console.log("lll", userDetails.profileImage
            .replace(/new ObjectId\(([^)]+)\)/g, '"$1"')
            .replace(/(\w+):/g, '"$1":')
            .replace(/'([^']+)'/g, '"$1"')
            .replace(/""([^"]+)""/g, '"$1"')
            .replace(/"([^"]+:\/\/[^"]+)"/g, '"$1"')
            .replace(/""([^"]+)""/g, '"$1"') 
            .replace(/\n|\r/g, '').trim());

    }

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
                            <img
                                src={JSON.parse(userDetails.profileImage
                                    .replace(/new ObjectId\(([^)]+)\)/g, '"$1"')
                                    .replace(/(\w+):/g, '"$1":')
                                    .replace(/'([^']+)'/g, '"$1"')
                                    .replace(/""([^"]+)""/g, '"$1"')
                                    .replace(/"([^"]+)":\s*""([^"]+)""/g, '"$1": "$2"')
                                    .replace(/""https""/g, '"https')
                                    .replace(/\n|\r/g, '').trim()).imgUrl}
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

                {/* Title on the left */}
                <div className="navbar-title">
                    חגיגה מושלמת
                </div>
            </nav>
        </div>
    );
};

export default Navbar;