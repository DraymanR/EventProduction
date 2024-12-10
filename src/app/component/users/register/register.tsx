'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '../../../store/modelStore';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { UserFormData, Language, Title } from '@/app/types/user';
import { addUser } from '../../../services/user/registerUser';
import { CldUploadWidget } from 'next-cloudinary';


const Register: React.FC<{ onBack: () => void }> = ({ onBack }) => {
let profileImage='';
    const handleUploadSuccess = async (result: any) => {
        if (result.info && result.info.secure_url) {
           profileImage = result.info.secure_url;
        }
    };

  
    const [formData, setFormData] = useState<UserFormData>({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        titles: ['consumer'],
        phone: '',
       
        languages: [Language.Hebrew],
        address: {
            zipCode: '',
            city: '',
            street: '',
            building: 0,
        },
        description: '',
         profileImage:'',
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

            formData.titles.includes('consumer') ? router.push('/pages/consumer-account') : router.push('/pages/supplier-account')

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
                    </div>


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
                    {/* {formData.titles.includes('consumer') && (
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
                    )} */}
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
                  
   
        <CldUploadWidget 
            uploadPreset="appOrganizerEvent"
            onSuccess={handleUploadSuccess}
            options={{
                sources: [
                    'local', // Local files
                    'camera', // Camera capture
                    'google_drive', // Google Drive
                    'url' // Web URL
                ],
                maxFiles: 35, // limit to 35 file
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
// import React, { useState } from 'react';
// import { useRouter } from 'next/router'; // הייבוא הנכון של useRouter
// import axios from 'axios';

// const Register = () => {
//   const router = useRouter();
  
//   // מצב נתוני הטופס
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     userName: '',
//     email: '',
//     password: '',
//     phone: '',
//     title: '',
//     language: [],
//     address: {
//       userName: '',
//       zipCode: '',
//       city: '',
//       street: '',
//       building: 0,
//     },
//     description: '',
//     profileImage: '',
//     startingPrice: 0,
//     topPrice: 0,
//   });

//   // מצב שגיאות לאימות
//   const [error, setError] = useState('');

//   // פונקציה לעדכון שדות הטופס
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // פונקציה לעדכון שדות כתובת
//   // פונקציה לעדכון שדות הטופס, שתתאים לשני סוגי האלמנטים (input ו-textarea)

  
//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       address: { ...prev.address, [name]: value },
//     }));
//   };

//   // פונקציה להעלאת התמונה
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('upload_preset', 'profile_images'); // החלף ב-upload_preset שלך
//       try {
//         const res = await axios.post(
//           'https://api.cloudinary.com/v1_1/your-cloud-name/upload',
//           formData
//         );
//         setFormData((prev) => ({
//           ...prev,
//           profileImage: res.data.secure_url, // שומר את ה-URL של התמונה בטופס
//         }));
//       } catch (err) {
//         console.error('Error uploading image:', err);
//         setError('שגיאה בהעלאת התמונה');
//       }
//     }
//   };

//   // פונקציה לשליחת הטופס
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const {
//       firstName, lastName, userName, email, password, title,
//       phone, language, address, description, profileImage, startingPrice, topPrice,
//     } = formData;

//     // אימות שדות חובה
//     if (!firstName || !lastName || !userName || !email || !password || !title || !phone || !language || !address || !description) {
//       setError('אנא מלא את כל השדות');
//       return;
//     }

//     try {
//       const res = await axios.post('/api/register', {
//         firstName,
//         lastName,
//         userName,
//         email,
//         password,
//         title,
//         phone,
//         language,
//         address,
//         description,
//         profileImage,
//         startingPrice,
//         topPrice,
//       });

//       if (res.status === 201) {
//         router.push('/login'); // הפניה לדף התחברות לאחר הרשמה מוצלחת
//       }
//     } catch (err) {
//       console.error('Error during registration:', err);
//       setError('שגיאה בהרשמה');
//     }
//   };

//   return (
//     <div>
//       <h1>הרשמה</h1>
//       <form onSubmit={handleSubmit}>
//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <label>שם פרטי</label>
//         <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

//         <label>שם משפחה</label>
//         <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

//         <label>שם משתמש</label>
//         <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />

//         <label>אימייל</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//         <label>סיסמה</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />

//         <label>טלפון</label>
//         <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

//         <label>תואר</label>
//         <select name="title" value={formData.title} onChange={handleChange} required>
//           <option value="supplier">ספק</option>
//           <option value="Makeup artist">מאפר</option>
//           <option value="photographer">צלם</option>
//           <option value="sound engineer">מהנדס סאונד</option>
//           <option value="event designer">מעצב אירועים</option>
//           <option value="orchestra">תזמורת</option>
//           <option value="singer">זמר</option>
//         </select>

//         <label>שפות</label>
//         <select multiple name="language" value={formData.language} onChange={handleChange} required>
//           <option value="Hebrew">עברית</option>
//           <option value="English">אנגלית</option>
//           <option value="French">צרפתית</option>
//           <option value="Yiddish">יידיש</option>
//           <option value="Spanish">ספרדית</option>
//           <option value="Russian">רוסית</option>
//         </select>

//         <label>כתובת</label>
//         <input type="text" name="userName" value={formData.address.userName} onChange={handleAddressChange} required />
//         <input type="text" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} required />
//         <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} required />
//         <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} required />
//         <input type="number" name="building" value={formData.address.building} onChange={handleAddressChange} required />

//         <label>תיאור</label>
//         <textarea name="description" value={formData.description} onChange={handleChange} required />

//         <label>תמונה פרופיל</label>
//         <input type="file" onChange={handleImageUpload} />

//         <button type="submit">הרשמה</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from 'react';
// import { UserFormData } from '@/app/types/user';
// import { addUser } from '@/app/services/user/registerUser'; // שים לב ששינית את הנתיב במידת הצורך

// const UserRegister: React.FC = () => {
//   const [formData, setFormData] = useState<UserFormData>({
//     firstName: '',
//     lastName: '',
//     userName: '',
//     email: '',
//     password: '',
//     phone: '',
//     titles: 'supplier', // שינוי לפי הצורך
//     language: ['English'], // שינוי לפי הצורך
//     address: {
//       city: '',
//       street: '',
//       building: 0,
//       zipCode: '',
//     },
//     description: '',
//     profileImage: '', // נניח שזה שדה למערכת קובץ
//   });

//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [successMessage, setSuccessMessage] = useState<string>('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccessMessage('');

//     try {
//       const response = await addUser(formData);
//       setSuccessMessage('User registered successfully!');
//     } catch (err) {
//       setError('There was an error registering the user.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="register-form">
//       <h2>Register New User</h2>
//       {error && <div className="error">{error}</div>}
//       {successMessage && <div className="success">{successMessage}</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="userName">Username</label>
//           <input
//             type="text"
//             id="userName"
//             name="userName"
//             value={formData.userName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="phone">Phone</label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="title">Title</label>
//           <select
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           >
//             <option value="supplier">Supplier</option>
//             <option value="photographer">Photographer</option>
//             <option value="makeupArtist">Makeup Artist</option>
//             <option value="soundEngineer">Sound Engineer</option>
//             <option value="eventDesigner">Event Designer</option>
//             <option value="orchestra">Orchestra</option>
//             <option value="singer">Singer</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="address.city">City</label>
//           <input
//             type="text"
//             id="address.city"
//             name="address.city"
//             value={formData.address.city}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="address.street">Street</label>
//           <input
//             type="text"
//             id="address.street"
//             name="address.street"
//             value={formData.address.street}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="address.building">Building</label>
//           <input
//             type="number"
//             id="address.building"
//             name="address.building"
//             value={formData.address.building}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="profileImage">Profile Image URL</label>
//           <input
//             type="text"
//             id="profileImage"
//             name="profileImage"
//             value={formData.profileImage}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserRegister;
