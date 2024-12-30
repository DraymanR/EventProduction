"use client";

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import useUserStore from "@/app/store/userModel";
import { useEffect, useState } from "react";
import UpdateUserPersonalDetails from "@/app/component/users/updateUserPersonalDetails";
import { UserFormData } from "@/app/types/user";

const Home: React.FC = () => {
    console.log("page personal details");
    const userDetails = useUserStore((state) => state.user);

    // State to toggle the update form
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        console.log("Updated userDetails:", userDetails);
    }, [userDetails]);


    return (
        <div dir="rtl">
            {userDetails ? (
                <div>
                    <ShowUserPersonalDetails user={userDetails} />
                    <button onClick={() => setShowUpdateForm((prev) => !prev)} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                        {showUpdateForm ? "Hide Update Form" : "Update Details"}
                    </button>
                    {showUpdateForm && (
                        <div>
                            <UpdateUserPersonalDetails user={userDetails} />
                        </div>
                    )}
                </div>
            ) : (
                <p>No user data found , please log in</p>
            )}
        </div>
    );
};

export default Home;
