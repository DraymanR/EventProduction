import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '@/app/store/modelStore';
// import useMyUser from '@/app/store/users';
import { singIn } from '@/app/services/user/registerUser';
import LoginWithGoogle from '@/app/component/users/register/loginWithGoogle';
import axios from 'axios';

const LoginWithPassword: React.FC<{ onForgetPassword: (email: string) => void; onNewUser: () => void }> = ({ onForgetPassword, onNewUser: onNewUser }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const closeModal = useModalStore((state) => state.closeModal);
    // const setMyUserName = useMyUser((state) => state.setUserName);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, email, password } = e.currentTarget.elements as any;

        try {
            const result = await singIn(email.value, userName.value, password.value);
            console.log(result);
            // setMyUserName(userName.value);
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
                <div>
                    <label htmlFor="password" className="block font-medium">סיסמה</label>
                    <input id="password" name="password" type="password" required className="w-full px-3 py-2 border rounded-md" />
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
