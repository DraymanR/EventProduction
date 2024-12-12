// import React from 'react'
// import googleImage from '@/app/assets/images/google.png';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// function LoginWithGoogle() {
//     const router = useRouter();

//     const handleGoogleSignIn = async () => {
//         try {
//             console.log("await signIn('google')");
//             router.push('/pages/user-account');
//             // closeModal()

//             // await signIn('google'); // מחייב הגדרה של ספק Google ב-next-auth
//         } catch (error) {
//             console.error('Google sign-in failed:', error);
//         }
//     };

//     return (
//         <div>
//             < h2 className="text-red-400 text-m  text-center mb-6" > —————  התחבר באמצעות google —————</h2 >
//             <button
//                 onClick={handleGoogleSignIn}
//                 className="w-full bg-yellow-100 py-2 px-4 border rounded-lg shadow-lg hover:bg-yellow-200 transition flex items-center justify-center gap-2"
//             >
//                 <Image
//                     src={googleImage}
//                     alt="תמונת פרופיל"
//                     width={20}
//                     height={20}
//                     className="rounded-full border object-cover"
//                 />
//                 Google
//             </button>
//         </div>
//     )
// }

// export default LoginWithGoogle

'use client'
import { useSession, signIn, signOut } from "next-auth/react"

const LoginBtn = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
        <p className="mb-2 text-lg font-semibold text-gray-800">

          Signed in as <span className="text-blue-600">{session.user.userName || session.user.email}</span>

        </p>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="mb-2 text-lg font-semibold text-gray-800">
        Not signed in
      </p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  )
}

export default LoginBtn
