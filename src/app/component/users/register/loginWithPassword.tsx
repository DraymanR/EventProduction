import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '@/app/store/modelStore';
import { singIn } from '@/app/services/user/registerUser';
import LoginWithGoogle from '@/app/component/users/register/loginWithGoogle';
import axios from 'axios';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const LoginWithPassword: React.FC<{ onForgetPassword: (email: string) => void; onNewUser: () => void }> = ({ onForgetPassword, onNewUser: onNewUser }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const closeModal = useModalStore((state) => state.closeModal)
    const [showPassword, setshowPassword] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, email, password } = e.currentTarget.elements as any;

        try {
            const result = await singIn(email.value, userName.value, password.value);
            console.log(result);
            router.push('/pages/consumer-account');
            closeModal();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(`Error: ${error.message}`);
            } else {
                setErrorMessage('Error logging in.');
            }
        }
    };

    return (
        <div>
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">התחבר לחשבון שלך</h2>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="userName" className="block font-medium">שם משתמש</label>
                    <input id="userName" name="userName" type="text" required className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium">אימייל</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <label htmlFor="password" className="block font-medium">
                        סיסמה
                    </label>
                    <button
                        type="button"
                        onClick={() => { setshowPassword(!showPassword) }}
                        className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-gray-500">

                        {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />} {/* טקסט הכפתור משתנה לפי המצב */}
                    </button>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        onPaste={(e) => e.preventDefault()} // מניעת הדבקה
                        onCopy={(e) => e.preventDefault()} // מניעת העתקה
                        onCut={(e) => e.preventDefault()}  // מניעת גזירה
                    />

                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button type="submit" className="w-full bg-red-300 text-white py-2 px-4 rounded-lg shadow-lg  hover:bg-red-400 ">התחבר</button>
                <LoginWithGoogle></LoginWithGoogle>

            </form>
            <p className="text-center mt-4">
                שכחת סיסמה?{' '}
                <button
                    type="button"
                    onClick={() => onForgetPassword(email)}
                    className="text-blue-500 underline"
                >
                    איפוס סיסמה
                </button>
            </p>
            <p className='text-center'>
                אין לך חשבון?{' '}
                <button
                    type="button"
                    onClick={onNewUser} // לוחץ על כפתור זה יעביר לשלב הרשמה
                    className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                >
                    הירשם כאן
                </button>
            </p>
        </div>
    );
};

export default LoginWithPassword;
