'use client';

import Select, { MultiValue } from "react-select";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '../../../store/modelStore';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { UserFormData, Language, SupplierDetails, Title, Option } from '@/app/types/user';
import { addUser } from '../../../services/user/registerUser';
import { CldUploadWidget } from 'next-cloudinary';
import router from "next/router";
// בתוך הקומפוננטה Register
const Register: React.FC<{ onBack: () => void }> = ({ onBack }) => {

    let profileImage = '';
    const handleUploadSuccess = async (result: any) => {
        if (result.info && result.info.secure_url) {
            profileImage = result.info.secure_url;
        }
    };
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const closeModal = useModalStore((state) => state.closeModal);
    const [showPassword, setshowPassword] = useState(false);
    const [isSupplier, setIsSupplier] = useState(false);
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        titles: [],
        phone: '',
        description: '',
        languages: [Language.Hebrew],

        address: {
            zipCode: '',
            city: '',
            street: '',
            building: 0,
        },

        supplierDetails: { startingPrice: 0, topPrice: 0 },
        profileImage: ''
    });
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
            console.log("user", formData);
            console.log('Sending request...');
            const result = await addUser(formData);
            console.log(result);
           
            router.push('/pages/user-account');
            closeModal();
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const language: Option[] = [
        { value: Language.English, label: "אנגלית" },
        { value: Language.French, label: "צרפתית" },
        { value: Language.Hebrew, label: "עיברית" },
        { value: Language.Russian, label: "רוסית" },
        { value: Language.Spanish, label: "ספרדית" },
        { value: Language.Yiddish, label: "אידייש" },

    ];
    const titleOptions: Option[] = Object.keys(Title).map(key => ({
        value: Title[key as keyof typeof Title],
        label: Title[key as keyof typeof Title],
    }));
    titleOptions.push({
        value: 'consumer',
        label: 'צרכן',
    });
    const mySetSelectedLanguages = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions);
        // עדכון formData.languages עם ערכים כמחרוזות
        const languagesArray = selectedOptions.map((option) => option.value as Language);
        console.log(languagesArray);

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            languages: languagesArray,
        }));
    }

    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBackStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const mySetSelectedTitles = (selectedOptions: MultiValue<Option>) => {
        setSelectedTitles(selectedOptions);

        const titleArray = selectedOptions.map((option) => { option.value as Title || 'consumer'; (option.value != 'consumer') ? setIsSupplier(true) : setIsSupplier(false); });
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            titles: titleArray,
        }));
    };

    // const handleInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    // ) => {
    //     const { name, value } = e.target;
    //     if (name.includes('.')) {
    //         const [parent, child] = name.split('.');
    //         setFormData((prevState) => {
    //             const parentValue = prevState[parent as keyof UserFormData];

    //             if (typeof parentValue === 'object' && parentValue !== null) {
    //                 return {
    //                     ...prevState,
    //                     [parent]: {
    //                         ...parentValue,
    //                         [child]: value,
    //                     },
    //                 };
    //             } else {
    //                 console.error(`Expected ${parent} to be an object, but got:`, parentValue);
    //                 return prevState; // לא מבצע עדכון אם השדה אינו אובייקט
    //             }
    //         });
    //     }

    //     else {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             [name]: value,
    //         }));
    //     }
    // };


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


    return (
        <div className="text-center w-[80vh] mx-auto mb-10 max-h-[80vh] p-6">
            <h2 className="text-red-400 text-2xl font-bold text-center mb-6">צור חשבון חדש</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* שלב ראשון */}
                {currentStep === 1 && (
                    <>
                        <div className="border p-2 rounded">
                            <label htmlFor="firstName" className="block font-medium">שם פרטי</label>
                            <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
                        </div>
                        <div className="border p-2 rounded">
                            <label htmlFor="lastName" className="block font-medium">שם משפחה</label>
                            <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
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
                        <div className="border p-2 rounded">
                            <label htmlFor="email" className="block font-medium">אימייל</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full px-3 py-2 border rounded-md" />
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

                    </>
                )}

                {/* שלב שני */}
                {currentStep === 2 && (

                    <><h5 className="text-l font-bold mt-4">כתובת</h5><br></br><div className="border p-2 rounded">

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
                            className="w-full px-3 py-2 border rounded-md" />
                    </div><div className="border p-2 rounded">
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
                                className="w-full px-3 py-2 border rounded-md" />
                        </div><div className="border p-2 rounded">

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
                                className="w-full px-3 py-2 border rounded-md" />
                        </div><div className="border p-2 rounded">

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
                                className="w-full px-3 py-2 border rounded-md" />
                        </div></>)}
                {/* שלב של טיטלים */}
                {currentStep === 3 && (
                    <>
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
                            <div className="border p-2 rounded">
                                <label>בחר סוג משתמש:</label>
                                <Select
                                    options={titleOptions}
                                    isMulti
                                    placeholder="בחר טיטל"
                                    onChange={mySetSelectedTitles}
                                    value={selectedTitles}
                                />
                            </div>
                            <div className="border p-2 rounded">
                                <label>
                                    השפות שלי:
                                    <Select
                                        options={language}
                                        isMulti
                                        placeholder="בחר שפות..."
                                        onChange={mySetSelectedLanguages}

                                        value={selectedLanguages}
                                    />
                                </label>
                            </div>
                            {isSupplier
                                && (
                                    <>
                                        <div className="border p-2 rounded">
                                            <label htmlFor="minPrice" className="block font-medium">מחיר מינימלי</label>
                                            <input
                                                id="minPrice"
                                                name="minPrice"
                                                type="number"
                                                value={formData.supplierDetails?.startingPrice}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border rounded-md"
                                            />
                                        </div>
                                        <div className="border p-2 rounded">
                                            <label htmlFor="maxPrice" className="block font-medium">מחיר מקסימלי</label>
                                            <input
                                                id="maxPrice"
                                                name="maxPrice"
                                                type="number"
                                                value={formData.supplierDetails?.topPrice}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border rounded-md"
                                            />
                                        </div>
                                    </>
                                )}
                       </div> </>
                )}

                        {/* שלב של תמונת פרופיל */}
                        {currentStep === 4 && (
                            <>

                                {/* אם יש טיטל "ספק" נוסיף שדות של מחיר */}

                                <div className="border p-2 rounded">
                                    <label>העלאת תמונת פרופיל</label>

                                    <CldUploadWidget
                                        uploadPreset="appOrganizerEvent"
                                        onSuccess={handleUploadSuccess}
                                        options={{
                                            sources: [
                                                'local',
                                                'camera',
                                                'google_drive',
                                                'url'
                                            ],
                                            maxFiles: 35,
                                        }}
                                    >
                                        {({ open }) => (
                                            <button
                                                onClick={() => open()}
                                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            >
                                                Upload an Image
                                            </button>
                                        )}
                                    </CldUploadWidget>
                                </div>
                            </>
                        )}

                        <div className="flex justify-between">
                            {currentStep > 1 && <button type="button" onClick={handleBackStep} className="bg-gray-500 text-white py-2 px-4 rounded-md">Back</button>}
                            {currentStep < 4 ? (
                                <button type="button" onClick={handleNextStep} className="bg-red-400 text-white py-2 px-4 rounded-md">Next</button>
                            ) : (
                                <button type="submit" className="bg-red-400 text-white py-2 px-4 rounded-md">הירשם</button>
                            )}
                        </div>
                    </form>
        </div>
    );
};
export default Register;

