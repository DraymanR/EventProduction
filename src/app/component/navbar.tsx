'use client'
import useModalStore from '@/app/store/modelStore';
import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';

const Navbar = () => {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <nav className="bg-gray-800 py-2">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                {/* כותרת */}
                <div className="text-red-400 text-lg font-bold whitespace-nowrap">
                    חגיגה מושלמת
                </div>

                {/* אזור התמונה והפרופיל */}
                <div className="flex items-center space-x-4">
                    <div
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => { openModal(); }}
                    >
                        <Image
                            src={profileImage}
                            alt="תמונת פרופיל"
                            width={60}
                            height={60}
                            className="rounded-full border object-cover"
                        />
                        <p className="mt-1 text-center text-sm font-medium text-red-400">
                            הפרופיל שלי
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
