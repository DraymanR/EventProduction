'use client'
import useModalStore from '@/app/store/modelPop-upWindow';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import "@/app/css/customNavbar.css";


const Navbar = () => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <div className="navbar">
            <nav className="navbar-container">
                {/* אזור הפרופיל בצד ימין */}
                <div className="profile-section">
                    <div
                        className="profile-image-container"
                        onClick={() => { openModal(); }}
                    >
                        <Image
                            src={profileImage}
                            alt="תמונת פרופיל"
                            width={50}
                            height={50}
                            className="profile-image"
                        />
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