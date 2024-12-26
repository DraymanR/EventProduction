// // to delete this file before uploaud to github

// // componnent of update - user - personal - details
// 'use client';

// import React, { useState } from 'react';
// import { UserFormData, Title, Language } from '@/app/types/user';
// import useUserStore from '@/app/store/userModel';

// interface UpdateUserPersonalDetailsProps {
//   user: UserFormData;
// }

// const UpdateUserPersonalDetails: React.FC<UpdateUserPersonalDetailsProps> = ({ user }) => {
//   const setUser = useUserStore((state) => state.setUser);
//   const [formData, setFormData] = useState<UserFormData>({
//     ...user,
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     userName: user?.userName || '',
//     email: user?.email || '',
//     password: user?.password || '',
//     phone: user?.phone || '',
//     description: user?.description || '',
//     titles: user?.titles || [],
//     languages: user?.languages || [],
//     profileImage: user?.profileImage || null,
//     address: {
//       street: user?.address?.street || '',
//       city: user?.address?.city || '',
//       building: user?.address?.building || 0,
//       zipCode: user?.address?.zipCode || '',
//     },
//     supplierDetails: user?.supplierDetails,
//   });
//   const [newTitle, setNewTitle] = useState('');
//   const [newLanguage, setNewLanguage] = useState('');
//   const [message, setMessage] = useState('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
//           [child]: child === 'building' ? Number(value) : value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleTitleAdd = () => {
//     if (newTitle && Object.values(Title).includes(newTitle as Title)) {
//       setFormData(prev => ({
//         ...prev,
//         titles: [...prev.titles, newTitle as Title]
//       }));
//       setNewTitle('');
//     }
//   };

//   const handleLanguageAdd = () => {
//     if (newLanguage && Object.values(Language).includes(newLanguage as Language)) {
//       setFormData(prev => ({
//         ...prev,
//         languages: [...prev.languages, newLanguage as Language]
//       }));
//       setNewLanguage('');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/users/put', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Profile updated successfully!');
//         setUser(data.user);
//       } else {
//         setMessage(data.error || 'Failed to update profile');
//       }
//     } catch (error) {
//       setMessage('An error occurred while updating profile');
//     }
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Update Personal Details</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Base fields */}
//           <div>
//             <label className="block text-sm font-medium mb-1">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full border rounded p-2"
//             />
//           </div>
//           {/* Add similar input fields for lastName, userName, email, phone */}
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             className="w-full border rounded p-2"
//             rows={3}
//           />
//         </div>

//         {/* Address fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">City</label>
//             <input
//               type="text"
//               name="address.city"
//               value={formData.address.city}
//               onChange={handleInputChange}
//               className="w-full border rounded p-2"
//             />
//           </div>
//           {/* Add similar input fields for street, building, zipCode */}
//         </div>

//         {/* Titles and Languages */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Add Title</label>
//             <select
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               className="w-full border rounded p-2"
//             >
//               <option value="">Select Title</option>
//               {Object.values(Title).map((title) => (
//                 <option key={title} value={title}>{title}</option>
//               ))}
//             </select>
//             <button
//               type="button"
//               onClick={handleTitleAdd}
//               className="mt-2 bg-gray-200 px-3 py-1 rounded"
//             >
//               Add Title
//             </button>
//             <div className="mt-2">
//               <span className="text-sm font-medium">Current Titles: </span>
//               {formData.titles.join(', ')}
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Add Language</label>
//             <select
//               value={newLanguage}
//               onChange={(e) => setNewLanguage(e.target.value)}
//               className="w-full border rounded p-2"
//             >
//               <option value="">Select Language</option>
//               {Object.values(Language).map((lang) => (
//                 <option key={lang} value={lang}>{lang}</option>
//               ))}
//             </select>
//             <button
//               type="button"
//               onClick={handleLanguageAdd}
//               className="mt-2 bg-gray-200 px-3 py-1 rounded"
//             >
//               Add Language
//             </button>
//             <div className="mt-2">
//               <span className="text-sm font-medium">Current Languages: </span>
//               {formData.languages.join(', ')}
//             </div>
//           </div>
//         </div>

//         {message && (
//           <div className={`p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//             {message}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUserPersonalDetails;