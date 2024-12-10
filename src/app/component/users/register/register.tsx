'use client';

import Select, { MultiValue } from "react-select";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '../../../store/modelPop-upWindow';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { UserFormData, Language, Title, Option } from '@/app/types/user';
import { addUser } from '../../../services/user/registerUser';


const Register: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [formData, setFormData] = useState<UserFormData>({
        porofilPic: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        titles: [],
        phone: '',
        description: '',
        languages: [],
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
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const language: Option[] = [
        { value: Language.English, label: "אנגלית" },
        { value: Language.French, label: "צרפתית" },
        { value: Language.Hebrew, label: "עיברית" },
        { value: Language.Russian, label: "רוסית" },
        { value: Language.Spanish, label: "ספרדית" },
        { value: Language.Yiddish, label: "אידייש" },

    ];

    const mySetSelectedLanguages = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions);
        // עדכון formData.languages עם ערכים כמחרוזות
        const languagesArray = selectedOptions.map((option) => option.value as Language);
        console.log(languagesArray);

        setFormData((prevFormData) => ({
            ...prevFormData,
            languages: languagesArray,
        }));
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData((prevState) => {
                const parentValue = prevState[parent as keyof UserFormData];

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
            const result = await addUser(formData)
            console.log(result);
            // // רישום הצליח, הפנה לדף הכניסה או לדשבורד

            formData.titles.includes('consumer') ? router.push('/pages/user-account') : router.push('/pages/supplier-account')

            closeModal()
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-center w-[80vh] mx-auto mb-10 max-h-[80vh] p-6 ">
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">צור חשבון חדש</h2>
            <div >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
                    <div className="border p-2 rounded" >
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
                    <div className="border p-2 rounded" >
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
                    <div className="border p-2 rounded" >
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
                    <div className="border p-2 rounded" >

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
                    <div className="relative border p-2 rounded" >
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
                            onPaste={(e) => e.preventDefault()} // מניעת הדבקה
                            onCopy={(e) => e.preventDefault()} // מניעת העתקה
                            onCut={(e) => e.preventDefault()}  // מניעת גזירה
                        />
                        <button
                            type="button"
                            onClick={() => { setshowPassword(!showPassword) }}
                            className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-gray-500">

                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />} {/* טקסט הכפתור משתנה לפי המצב */}

                        </button>
                    </div>
                    <div className="relative border p-2 rounded" >
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
                            onPaste={(e) => e.preventDefault()} // מניעת הדבקה
                            onCopy={(e) => e.preventDefault()} // מניעת העתקה
                            onCut={(e) => e.preventDefault()}  // מניעת גזירה
                        />
                        <button
                            type="button"
                            onClick={() => { setshowconfirmPassword(!showconfirmPassword) }}
                            className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-gray-500">

                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />} {/* טקסט הכפתור משתנה לפי המצב */}
                        </button>
                    </div>
                    <div className=" border p-2 rounded" >
                        <label htmlFor="title" className="block font-medium">
                            סוג משתמש
                        </label>
                        <select
                            id="title"
                            name="title"
                            value={'consumer'}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        >
                            <option value="consumer">צרכן</option>
                            <option value="supplier">ספק</option>
                        </select>
                    </div>

                    <div className="border p-2 rounded" >

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
                    <div className="border p-2 rounded" >
                        <label htmlFor="description" className="block font-medium">
                            כמה מילים עלי
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                    <div className="border p-2 rounded">
                        <label>
                            השפות שלי:
                            <Select
                                options={language}//.map((supplier) => ({ value: supplier, label: supplier }))} // מיפוי לערכים ש-React-Select מבין
                                isMulti // מאפשר בחירה מרובה
                                placeholder="בחר שפות..."
                                onChange={mySetSelectedLanguages}
                                // onChange={(selectedOptions) => setSelectedLanguages(selectedOptions)}
                                value={selectedLanguages}
                            // value={formData.languages.map((supplier) => ({ value: supplier, label: supplier }))}
                            />
                        </label>
                    </div>
                    {/* 
                    <div className="border p-2 rounded">
                        <label htmlFor="language" className="block font-medium">
                            שפות
                        </label>
                        <select
                            id="language"
                            name="language"
                            multiple
                            value={formData.languages}  // כאן נשמור את השפות שנבחרו במערך
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
                    </div> */}


                    {/* Address Details */}
                    <h5 className="text-l font-bold mt-4">כתובת</h5>
                    <br></br>

                    <div className="border p-2 rounded" >

                        <label htmlFor="zipCode" className="block font-medium">
                            מיקוד
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
                    </div>
                    <div className="border p-2 rounded" >
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
                    <div className="border p-2 rounded" >

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
                    <div className="border p-2 rounded" >

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
                    {!formData.titles.includes('consumer') && (
                        <>
                            <h3 className="text-xl font-bold mt-4">פרטי ספק</h3>
                            <br></br>
                            <div className=" border p-2 rounded" >
                                <label htmlFor="title" className="block font-medium">
                                    המקצוע שלי
                                </label>
                                <select
                                    id="title"
                                    name="title"
                                    value={'consumer'}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="supplier">אחר</option>
                                    <option value="Makeup artist">מאפרת</option>
                                    <option value="photographer">צלם</option>
                                    <option value="sound engineer">מהנדס סאונד</option>
                                    <option value="event designer">מעצב אירועים</option>
                                    <option value="orchestra">תזמורת</option>
                                    <option value="singer">זמר</option>
                                </select>
                            </div>
                            <div className="border p-2 rounded" >
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
                        </>
                    )}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="col-span-2 flex justify-center">
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
                    </div>

                    <br></br>
                </form>
                <p className="text-center mt-4">
                    <button
                        type="button"
                        onClick={onBack} // לוחץ על כפתור זה יעביר לשלב התחברות עם סיסמה
                        className="text-blue-500 underline bg-transparent border-none cursor-pointer"
                    >
                        התחבר כאן
                    </button>
                    כבר יש לך חשבון?{' '}
                </p>
                <br></br>

            </div>
        </div>
    );
};

export default Register;
