'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '../store/modelStore';

interface FormData {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    title: 'supplier' | 'consumer';
    phone: string;
    language: 'Hebrew' | 'English' | 'French' | 'Yiddish' | 'Spanish' | 'Russian';
    address: {
        zipCode: string;
        city: string;
        street: string;
        building: number;
    };
    supplierDetails?: {
        startingPrice: number;
        topPrice: number;
        eventList: string[];
        recommendation: string[];
        range: number;
        emptyDate: string[];
        images: string[];
        description: string;
    };
}


const Register: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        title: 'consumer',
        phone: '',
        language: 'Hebrew',
        address: {
            zipCode: '',
            city: '',
            street: '',
            building: 0,
        },
        supplierDetails: {
            startingPrice: 0,
            topPrice: 0,
            eventList: [],
            recommendation: [],
            range: 0,
            emptyDate: [],
            images: [],
            description: '',
        },
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const [showPassword, setshowPassword] = useState(false);
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const closeModal = useModalStore((state) => state.closeModal);


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevState) => {
                const parentValue = prevState[parent as keyof FormData];

                if (typeof parentValue === 'object' && parentValue !== null) {
                    return {
                        ...prevState,
                        [parent]: {
                            ...parentValue,
                            [child]: value,
                        },
                    };
                } else {
                    console.error(`Expected ${parent} to be an object, but got:`, parentValue);
                    return prevState; // לא מבצע עדכון אם השדה אינו אובייקט
                }
            });
        }

        else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (formData.password !== confirmPassword) {
            setError('הסיסמאות אינן תואמות');
            setIsSubmitting(false);
            return;
        }

        setError('');

        try {
            console.log('const response = await...');
            console.log(formData);


            // const response = await fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'Registration failed');
            // }

            // // רישום הצליח, הפנה לדף הכניסה או לדשבורד
            router.push('/pages/consumer-account');
            closeModal()
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">צור חשבון חדש</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block font-medium">
                        שם פרטי
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block font-medium">
                        שם משפחה
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="userName" className="block font-medium">
                        שם משתמש
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium">
                        אימייל
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
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
                        אשר סיסמה
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
                <div>
                    <label htmlFor="title" className="block font-medium">
                        סוג משתמש
                    </label>
                    <select
                        id="title"
                        name="title"
                        // value={(formData as any)[title]}
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="consumer">צרכן</option>
                        <option value="supplier">ספק</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="phone" className="block font-medium">
                        טלפון
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="language" className="block font-medium">
                        שפה
                    </label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="Hebrew">עברית</option>
                        <option value="English">אנגלית</option>
                        <option value="French">צרפתית</option>
                        <option value="Yiddish">יידיש</option>
                        <option value="Spanish">ספרדית</option>
                        <option value="Russian">רוסית</option>
                    </select>
                </div>

                {/* Address Details */}
                <h5 className="text-l font-bold mt-4">כתובת</h5>
                <div>
                    <label htmlFor="zipCode" className="block font-medium">
                        zipCode
                    </label>
                    <input
                        id="zipCode"
                        name="address.zipCode"
                        type="text"
                        value={formData.address.zipCode || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div><div>
                    <label htmlFor="city" className="block font-medium">
                        עיר
                    </label>
                    <input
                        id="city"
                        name="address.city"
                        type="text"
                        value={formData.address.city || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="street" className="block font-medium">
                        רחוב
                    </label>
                    <input
                        id="street"
                        name="address.street"
                        type="text"
                        value={formData.address.street || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div>
                    <label htmlFor="building" className="block font-medium">
                        מספר בית
                    </label>
                    <input
                        id="building"
                        name="address.building"
                        type="text"
                        value={formData.address.building || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                {formData.title === 'supplier' && (
                    <>
                        <h3 className="text-xl font-bold mt-4">פרטי ספק</h3>
                        <div>
                            <label htmlFor="startingPrice" className="block font-medium">
                                מחיר מינימלי
                            </label>
                            <input
                                id="startingPrice"
                                name="supplierDetails.startingPrice"
                                type="number"
                                value={formData.supplierDetails?.startingPrice || ''}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="topPrice" className="block font-medium">
                                מחיר מקסילמלי
                            </label>
                            <input
                                id="topPrice"
                                name="supplierDetails.topPrice"
                                type="number"
                                value={formData.supplierDetails?.topPrice || ''}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="range" className="block font-medium">
                                range
                            </label>
                            <input
                                id="range"
                                name="supplierDetails.range"
                                type="range"
                                value={formData.supplierDetails?.range || ''}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block font-medium">
                                תיאור
                            </label>
                            <input
                                id="description"
                                name="supplierDetails.description"
                                type="text"
                                value={formData.supplierDetails?.description || ''}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>
                    </>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white transition ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-400 hover:bg-red-600'
                        }`}
                >
                    {isSubmitting ? 'נרשם...' : 'הירשם'}
                </button>
            </form>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        </div>
    );
};

export default Register;
