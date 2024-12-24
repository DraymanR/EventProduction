'use client';

import React from 'react'
import {  ShowUserPersonalDetailsProps, UserFormData } from '@/app/types/user';



const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({ user}) => {
  console.log("user",user);
  return (

    <div className="user-details">
      <h1>{user.firstName} {user.lastName}</h1>
      <p><strong>Username:</strong> {user.userName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Title:</strong> {user.titles}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Description:</strong> {user.description}</p>
      <p><strong>Language:</strong> {user.languages}</p>
      <h3>Address:</h3>
      {/* <p>{User.address.street}, {User.address.building}, {User.address.city}, {User.address.zipCode}</p> */}
    
      
      
    </div>
  );
};

export default ShowUserPersonalDetails;
