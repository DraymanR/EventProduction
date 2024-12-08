import React from 'react'
import googleImage from '@/app/assets/images/google.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function LoginWithGoogle() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            console.log("await signIn('google')");
            router.push('/pages/user-account');
            // closeModal()

            // await signIn('google'); // מחייב הגדרה של ספק Google ב-next-auth
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <div>
            < h2 className="text-red-400 text-m  text-center mb-6" > —————  התחבר באמצעות google —————</h2 >
            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-yellow-100 py-2 px-4 border rounded-lg shadow-lg hover:bg-yellow-200 transition flex items-center justify-center gap-2"
            >
                <Image
                    src={googleImage}
                    alt="תמונת פרופיל"
                    width={20}
                    height={20}
                    className="rounded-full border object-cover"
                />
                Google
            </button>
        </div>
    )
}

export default LoginWithGoogle