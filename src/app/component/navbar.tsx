'use client'
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-red-400 text-xl font-bold">חגיגה מושלמת</div>
                <div className="fixed right-64 flex space-x-6">
                    <Link href="/pages/about" className="text-white hover:text-red-400">
                        אודות האתר
                    </Link>
                    <Link href="/pages/login" className="text-white hover:text-red-400">
                        התחברות לחשבון
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
