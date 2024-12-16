'use client';

import React from 'react'
import {  UserFormData } from '@/app/types/user';


interface ShowUserPersonalDetailsProps {
  User: UserFormData;
}

const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({User}) => {
  console.log("user",User);
  return (

    <div className="user-details">
      <h1>{User.firstName} {User.lastName}</h1>
      <p><strong>Username:</strong> {User.userName}</p>
      <p><strong>Email:</strong> {User.email}</p>
      <p><strong>Title:</strong> {User.titles}</p>
      <p><strong>Phone:</strong> {User.phone}</p>
      <p><strong>Description:</strong> {User.description}</p>
      <p><strong>Language:</strong> {User.languages}</p>
      <h3>Address:</h3>
      {/* <p>{User.addressId.street}, {User.address.building}, {User.address.city}, {User.address.zipCode}</p> */}
    
      
      
    </div>
  );
};

export default ShowUserPersonalDetails;