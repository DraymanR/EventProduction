'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '@/app/store/modelStore';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const closeModal = useModalStore((state) => state.closeModal);
    const router = useRouter();

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage('הסיסמאות אינן תואמות');
            return;
        }

        try {
            // כאן נבצע את קריאת ה-API לשינוי הסיסמה
            console.log('סיסמה חדשה:', newPassword);

            // לאחר שינוי הסיסמה נוכל להפנות את המשתמש למסך התחברות
            router.push('/pages/consumer-account');
            closeModal()

        } catch (error) {
            console.error('Error during password reset:', error);
            setErrorMessage('הייתה שגיאה בשינוי הסיסמה');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">שנה את הסיסמה שלך</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                    <label htmlFor="newPassword" className="block font-medium">
                        סיסמה חדשה
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block font-medium">
                        אשר סיסמה חדשה
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showconfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <button
                        type="button"
                        onClick={() => { setshowconfirmPassword(!showconfirmPassword) }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        {showconfirmPassword ? 'הסתר' : 'הצג'} {/* טקסט הכפתור משתנה לפי המצב */}
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                    עדכן סיסמה
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
