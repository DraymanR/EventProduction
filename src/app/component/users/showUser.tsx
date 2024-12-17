import React, { useEffect, useState } from 'react';
import { getUserDetails } from "@/app/services/user/getDetails";
import { UserResponseData } from '@/app/types/user';

const ShowUser = ({ userName }: { userName: string }) => {
    const [user, setUser] = useState<UserResponseData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetails = await getUserDetails(userName);
                console.log("Fetched User:", userDetails);
                setUser(userDetails); // שומר את המידע ב-state
                setError(null); // מנקה שגיאות אם יש
            } catch (err: any) {
                setError("Failed to fetch user details");
                console.error(err);
            }
        };

        fetchUser();
    }, [userName]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-details">
            <h1>Details for {user.userName}</h1>
            <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Description:</strong> {user.description}</p>
            <p><strong>Languages:</strong> {user.languages && user.languages.length > 0 ? user.languages.join(", ") : "No languages available"}</p>
            {/* <p><strong>Address:</strong> {`${user.addressId.street} ${user.addressId.building}, ${user.addressId.city}, ${user.addressId.zipCode}`}</p> */}
            {/* <p><strong>Titles:</strong> {user.titles.filter(Boolean).join(", ") || "No titles available"}</p> */}
            {/* <p><strong>Posts:</strong> {user.postArr.length}</p> */}
            {/* <p><strong>Liked Posts:</strong> {user.likedPostsArr.length}</p> */}
        </div>
    );
};

export default ShowUser;


