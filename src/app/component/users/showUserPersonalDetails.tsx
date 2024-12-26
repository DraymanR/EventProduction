'use client';

import React from 'react';
import { ShowUserPersonalDetailsProps } from '@/app/types/user';

const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({ user }) => {
  console.log("user", user);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="user-details bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Username:</strong> {user?.userName}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Email:</strong> {user?.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Phone:</strong> {user?.phone}
        </p>
                <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Language:</strong> {user?.languages.filter(Boolean).join(", ") || "No language available"}
        </p>
        <p className="text-gray-600">
          <strong className="font-semibold">Titles:</strong> {user?.titles.filter(Boolean).join(", ") || "No titles available"}
        </p>

        <p className="text-gray-600 mb-2">
          <strong className="font-semibold">Description:</strong> {user?.description}
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">Address:</h3>
        <p className="text-gray-600 mb-2">
          {user?.address?.street}, {user?.address?.building}, {user?.address?.city}, {user?.address?.zipCode}
        </p>

      </div>
    </div>
  );
};

export default ShowUserPersonalDetails;
