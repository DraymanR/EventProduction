'use client';

import React from 'react'
import { UserFormData } from '@/app/types/user';


interface ShowUserPersonalDetailsProps {
  userData: UserFormData;
}

const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({userData}) => {
  console.log("user",userData);
  return (

    <div className="user-details">
      <h1>{userData.firstName} {userData.lastName}</h1>
      <p><strong>Username:</strong> {userData.userName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Title:</strong> {userData.titles}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Description:</strong> {userData.description}</p>
      <p><strong>Language:</strong> {userData.languages}</p>
      <h3>Address:</h3>
      <p>{userData.address.street}, {userData.address.building}, {userData.address.city}, {userData.address.zipCode}</p>

      {userData.supplierDetails && (
        <>
          <h3>Supplier Details:</h3>
          <p><strong>Starting Price:</strong> {userData.supplierDetails.startingPrice}</p>
          <p><strong>Top Price:</strong> {userData.supplierDetails.topPrice}</p>
          <p><strong>Event List:</strong> {userData.supplierDetails.eventList.join(', ')}</p>
          <p><strong>Recommendation:</strong> {userData.supplierDetails.recommendation.join(', ')}</p>
          <p><strong>Range:</strong> {userData.supplierDetails.range} km</p>
          <p><strong>Empty Dates:</strong> {userData.supplierDetails.emptyDate.join(', ')}</p>
          <p><strong>Description:</strong> {userData.supplierDetails.description}</p>
          <div>
            <strong>Images:</strong>
            {/* {userData.supplierDetails.images.map((image, index) => (
              <img key={index} src={image} alt={`Supplier Image ${index + 1}`} />
            ))} */}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowUserPersonalDetails;

// const showUserPersonalDetails = (data: UserFormData) => {
//   return (
//     <div>
//       <div>
//         <h3>פרטי משתמש:</h3>
//         <p>שם מלא: ${data.firstName} ${data.lastName}</p>
//         <p>אימייל: ${data.email}</p>
//         <p>טלפון: ${data.phone}</p>
//         <p>שפה: ${data.language}</p>
//         <p>כותרת: ${data.title}</p>
//         <p>שם משתמש: ${data.userName}</p>

//         <h3>כתובת:</h3>
//         <p>עיר: ${data.address.city}</p>
//         <p>רחוב: ${data.address.street}, בניין: ${data.address.building}</p>
//         <p>מיקוד: ${data.address.zipCode}</p>

//         <h3>תיאור:</h3>
//         <p>${data.description}</p>
//       </div>
//       `;

//     </div>
//   )
// }

// export default showUserPersonalDetails 