// import { signIn } from 'next-auth/react';
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ResetPassword from './reset-password';
import Register from './register';
import useModalStore from '@/app/store/modelStore';
import { singIn } from '../services/user/registerUser';
import axios, { AxiosError } from 'axios';
import googleImage from '@/app/assets/images/google.png';
import Image from 'next/image';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from 'react-icons/io5';
import useMyUser from '../store/users';


const Login: React.FC = () => {
    const [isEnterCode, setIsEnterCode] = useState(false); //  אם אנחנו בשלב הזנת קוד
    const [isResetPassword, setIsResetPassword] = useState(false); //  אם אנחנו בשלב איפוס סיסמה
    const [isRegister, setIsRegister] = useState(false); //  אם אנחנו בשלב הרשמה
    const [code, setCode] = useState(''); // הקוד שהוזן
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const closeModal = useModalStore((state) => state.closeModal);
    const setMyUserName = useMyUser((state) => state.setUserName);
    const myUserName = useMyUser((state) => state.userName);

    const router = useRouter();


    const handleGoogleSignIn = async () => {
        try {
            console.log("await signIn('google')");
            router.push('/pages/consumer-account');
            closeModal()

            // await signIn('google'); // מחייב הגדרה של ספק Google ב-next-auth
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, email, password } = e.currentTarget.elements as any;

        try {
            console.log(userName.value, email.value, password.value);
            const result = await singIn(email.value, userName.value, password.value);
            console.log('User registered successfully:', result);
            setMyUserName(userName.value)
            console.log(myUserName);
            
            router.push('/pages/consumer-account');
            closeModal()
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // אם זה שגיאה של Axios
                setErrorMessage(`Error: ${error.message}`);
            } else {
                setErrorMessage('error: !!!!!!!!!!')
            }
            console.error('Login failed:', error);
        }
    };

    const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('')
        if (code === '123456') { // לדוגמה, הקוד הנכון הוא 123456
            // אם הקוד נכון, נוכל להוריד את הצגת ה-div של קוד
            setIsEnterCode(false);
            console.log(code);
            // לעבור לדף שינוי סיסמה
            setIsResetPassword(true)
        } else {
            setErrorMessage('הקוד לא נכון, נסה שנית.');
        }
    };

    return (
        <div>
            {isRegister ? (// קומפוננטת הרשמה
                <div>
                    <Register />
                    <p className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => setIsRegister(false)} // לוחץ על כפתור זה יעביר לשלב התחברות עם סיסמה
                            className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                        >
                            התחבר כאן
                        </button>
                        כבר יש לך חשבון?{' '}
                    </p>
                </div>
            ) : isResetPassword ? (
                <ResetPassword /> // קומפוננטת איפוס סיסמה
            ) : (
                <div>
                    {/* <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg"> */}
                    <h2 className="text-red-400 text-2xl font-bold text-center mb-6">התחבר לחשבון שלך</h2>
                    <div className="space-y-4">
                        {!isEnterCode ? (
                            <div>
                                {/* Google Sign-In */}
                                <h2 className="text-red-400 text-m  text-center mb-6"> ————— google התחבר באמצעות —————</h2>
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
                                <br></br>
                                {/* // Existing User Login */}
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <h2 className="text-red-400 text-m  text-center mb-6">——  התחבר באמצעות שם משתמש וסיסמא ——</h2>

                                    <div>
                                        <label htmlFor="userName" className="block font-medium text-center">
                                            שם משתמש
                                        </label>
                                        <input
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div> <div>
                                        <label htmlFor="email" className="block font-medium text-center">
                                            אימייל
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="password" className="block font-medium text-center">
                                            סיסמה
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                            onPaste={(e) => e.preventDefault()} // מניעת הדבקה
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setshowPassword(!showPassword)}
                                            className="absolute top-2/3 right-3 -translate-y-1/2 flex items-center text-gray-500"
                                        >
                                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                                        </button>
                                    </div>


                                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                                    <button
                                        type="submit"
                                        className="w-full bg-red-400 text-white py-2 px-4 border rounded-lg shadow-lg hover:bg-red-600 transition"
                                    >
                                        התחבר
                                    </button>
                                </form>
                            </div>


                        ) : (
                            // Password Reset Code Form
                            <div>
                                <form onSubmit={handleCodeSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="code" className="block font-medium">
                                            הקוד שנשלח אליך
                                        </label>
                                        <input
                                            id="code"
                                            name="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            required
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <p className="text-center">.הקוד תקף לחצי שעה</p>
                                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                                    <button
                                        type="submit"
                                        onChangeCapture={() => { }}
                                        className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                                    >
                                        אפס סיסמה
                                    </button>
                                </form>
                                <button
                                    type="button"
                                    onClick={() => setIsEnterCode(false)} // לוחץ על כפתור זה יעביר לשלב התחברות עם סיסמא
                                    className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                                >
                                    חזרה
                                </button>
                            </div>
                        )}

                        {/* Link to Registration and Password Recovery */}
                        {!isEnterCode && (
                            <div className="text-center space-y-2 text-red-400">
                                <p>
                                    אין לך חשבון?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsRegister(true)} // לוחץ על כפתור זה יעביר לשלב הרשמה
                                        className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                                    >
                                        הירשם כאן
                                    </button>
                                </p>
                                <p>
                                    שכחת סיסמה?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setIsEnterCode(true)} // לוחץ על כפתור זה יעביר לשלב איפוס סיסמה
                                        className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                                    >
                                        איפוס סיסמה
                                    </button>

                                </p>
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default Login;
