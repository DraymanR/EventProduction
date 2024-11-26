// import { signIn } from 'next-auth/react';
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserAuth: React.FC = () => {
    const [isResetPassword, setIsResetPassword] = useState(false); //  אם אנחנו בשלב איפוס סיסמה
    const [code, setCode] = useState(''); // הקוד שהוזן
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            console.log("await signIn('google')");
            router.push('/pages/consumer-account');

            // await signIn('google'); // מחייב הגדרה של ספק Google ב-next-auth
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = e.currentTarget.elements as any;

        try {
            console.log("await signIn('credentials', ...)");
            console.log(email.value, password.value);

            router.push('/pages/consumer-account');

            // await signIn('credentials', {
            //     email: email.value,
            //     password: password.value,
            //     redirect: false,
            // });
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('')
        if (code === '123456') { // לדוגמה, הקוד הנכון הוא 123456
            // אם הקוד נכון, נוכל להוריד את הצגת ה-div של קוד
            setIsResetPassword(false); // נסתיר את שלב הקוד ונוודא שהמשתמש יחזור למסך התחברות
            console.log(code);
            router.push('/pages/reset-password'); // לעבור לדף שינוי סיסמה
        } else {
            setErrorMessage('הקוד לא נכון, נסה שנית.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">התחבר לחשבון שלך</h2>
            <div className="space-y-4">
                {/* Google Sign-In */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-yellow-300  py-2 px-4 rounded-md hover:bg-yellow-400 transition"
                >
                    התחבר עם Google
                </button>

                {!isResetPassword ? (
                    // Existing User Login
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block font-medium">
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
                            <label htmlFor="password" className="block font-medium">
                                סיסמה
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                // value={password}
                                // onChange={}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => { setshowPassword(!showPassword) }}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                {showPassword ? 'הסתר' : 'הצג'} {/* טקסט הכפתור משתנה לפי המצב */}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        >
                            התחבר
                        </button>
                    </form>
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
                            onClick={() => setIsResetPassword(false)} // לוחץ על כפתור זה יעביר לשלב איפוס סיסמה
                            className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                        >
                            חזרה
                        </button>
                    </div>
                )}

                {/* Link to Registration and Password Recovery */}
                {!isResetPassword && (
                    <div className="text-center space-y-2">
                        <p>
                            אין לך חשבון?{' '}
                            <Link href="/pages/register" className="text-blue-500 underline">
                                הירשם כאן
                            </Link>
                        </p>
                        <p>

                            <button
                                type="button"
                                onClick={() => setIsResetPassword(true)} // לוחץ על כפתור זה יעביר לשלב איפוס סיסמה
                                className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                            >
                                איפוס סיסמה
                            </button>
                            ?שכחת סיסמה

                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAuth;
