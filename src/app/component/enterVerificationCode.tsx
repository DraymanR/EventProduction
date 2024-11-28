// 'use client';

// import { useState } from "react";

// const EnterVerificationCode = (handleCodeSubmit,) => {

//     const [code, setCode] = useState(''); // הקוד שהוזן
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setErrorMessage('')
//         if (code === '123456') { // לדוגמה, הקוד הנכון הוא 123456
//             // אם הקוד נכון, נוכל להוריד את הצגת ה-div של קוד
//             // setIsEnterCode(false); // נסתיר את שלב הקוד ונוודא שהמשתמש יחזור למסך התחברות
//             console.log(code);
//             // router.push('/pages/reset-password'); // לעבור לדף שינוי סיסמה
//             // setIsResetPassword(true)
//         } else {
//             setErrorMessage('הקוד לא נכון, נסה שנית.');
//         }
//     };


//     return (
//         <div>
//             <form onSubmit={handleCodeSubmit} className="space-y-4">
//                 <div>
//                     <label htmlFor="code" className="block font-medium">
//                         הקוד שנשלח אליך
//                     </label>
//                     <input
//                         id="code"
//                         name="code"
//                         type="text"
//                         value={code}
//                         onChange={(e) => setCode(e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border rounded-md"
//                     />
//                 </div>
//                 <p className="text-center">.הקוד תקף לחצי שעה</p>
//                 {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
//                 <button
//                     type="submit"
//                     // onChangeCapture={() => { }}
//                     className="w-full bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
//                 >
//                     אפס סיסמה
//                 </button>
//             </form>
//         </div>
//     )
// }
// export default EnterVerificationCode