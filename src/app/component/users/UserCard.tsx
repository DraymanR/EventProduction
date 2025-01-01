import React from 'react';

const UserCard: React.FC<{ user: any }> = ({ user }) => {
  const defaultProfileImage = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 text-gray-500"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M12 14c-4 0-6 2-6 6" />
    </svg>
  );

  return (
    <div className="user-card bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mb-6">
      <div className="header mb-4 flex items-center">
        {/* אם אין תמונת פרופיל, מציגים אייקון ברירת מחדל */}
        <div className="w-12 h-12 rounded-full mr-4 flex items-center justify-center bg-gray-200">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.userName}
              className="w-full h-full rounded-full"
            />
          ) : (
            defaultProfileImage // הצגת אייקון אם אין תמונת פרופיל
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800"><a href={`/pages/users/${user.userName}`} className="text-gray-600 hover:text-red-400">

          {user.userName}  </a></h2>
      </div>

      <div className="details mb-4">
        <p className="text-gray-700">
          <strong>מייל:</strong> {user.email}
        </p>
       { user?.addressId?.city&&<p className="text-gray-700">
          <strong>city:</strong> {user?.addressId?.city}
        </p>}
        <p className="text-gray-700">
          <strong>מספר טלפון:</strong> {user.phone}
        </p>
        <p className="text-gray-700">
          <strong>תפקידים:</strong> {user.titles.join(', ')}
        </p>
        <p className="text-gray-700">
          <strong>שפות:</strong> {user.languages.join(', ')}
        </p>
        <p className="text-gray-700">
          {/* <strong>City:</strong> {user.addressId.city} */}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
