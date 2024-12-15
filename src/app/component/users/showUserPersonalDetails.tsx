'use client';

import React from 'react'
import { UserFormData } from '@/app/types/user';



interface ShowUserPersonalDetailsProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    language: string;
    title: string;
    userName: string;
    address: {
      street: string;
      building: string;
      city: string;
      zipCode: string;
    };
    description: string;
    supplierDetails?: {
      startingPrice: number;
      topPrice: number;
      eventList: string[];
      recommendation: string[];
      range: number;
      emptyDate: string[];
      description: string;
      // images: string[]; // Commented out as it's not clear from the data structure
    };
  };
}

const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({ userData }) => {

  console.log("inside the show user details componnents")

  return (
    <div className="user-details">
      <h1>{userData.firstName} {userData.lastName}</h1>
      <p><strong>Username:</strong> {userData.userName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Title:</strong> {userData.title}</p>
      <p><strong>Phone:</strong> {userData.phone}</p>
      <p><strong>Description:</strong> {userData.description}</p>
      <p><strong>Language:</strong> {userData.language}</p>
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
          {/* Commented out the images section as it's not clear from the data structure */}
        </>
      )}
    </div>
  );
};

export default ShowUserPersonalDetails;