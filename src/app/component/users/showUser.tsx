import React, { useEffect, useState } from 'react';
import { getUserDetails } from "@/app/services/user/getDetails";
import { UserResponseData } from '@/app/types/user';
// import { getCookie } from 'cookies-next'; // אם אתה משתמש ב-cookies-next

const ShowUser = ({ userName }: { userName: string }) => {
    const [user, setUser] = useState<UserResponseData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false); // האם המשתמש הוא חלק מרשימת האהובים
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // האם המשתמש מחובר
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userDetails = await getUserDetails(userName);
                console.log("Fetched User:", userDetails);
                setUser(userDetails.user); // שומר את המידע ב-state
                setError(null); // מנקה שגיאות אם יש
            } catch (err: any) {
                setError("Failed to fetch user details");
                console.error(err);
            }
        };

        const checkIfLoggedIn = () => {
            if (typeof window !== 'undefined') {
                const cookies = document.cookie.split('; ');
                const usernameCookie = cookies.find(row => row.startsWith('userName='));
                if (usernameCookie) {
                    setIsLoggedIn(true);
                    const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
                    setLoggedInUser(myUserName)
                    console.log('Username from cookie:', myUserName);
                }
            }
        };

        fetchUser();
        checkIfLoggedIn();
    }, [userName]);

    useEffect(() => {
        // בדוק אם המשתמש שמוצג נמצא ברשימת האהובים של המשתמש המחובר
        //
        //
        if (isLoggedIn && user) {

        }
    }, [isLoggedIn, user]);

    const toggleFavorite = () => {
        // עדכון הרשימה אם המשתמש אהב או הסיר ספק
        //
        //
        setIsFavorite(!isFavorite);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-details p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Details for {user.userName}</h1>

            <div className="flex items-center space-x-4">
                {user.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                )}
                <div>
                    <p><strong>Full Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Description:</strong> {user.description}</p>
                    <p><strong>Languages:</strong> {user.languages.length > 0 ? user.languages.join(", ") : "No languages available"}</p>
                </div>
            </div>

            <div className="mt-4">
                {user.titles.length > 1 && user.titles.includes("consumer") === false ? (
                    <div>
                        <h2 className="text-xl font-semibold">Pricing:</h2>
                        <p>Price information goes here</p>
                    </div>
                ) : null}
            </div>

            {isLoggedIn && user && (
                <div className="mt-4">
                    <button
                        onClick={toggleFavorite}
                        className={`px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
                    >
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShowUser;
