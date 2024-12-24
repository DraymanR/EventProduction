'use client'

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import { getMyDetails } from "@/app/services/user/getDetails";
import useUserStore from "@/app/store/userModel";
import { UserFormData } from "@/app/types/user";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    console.log("page personal details")
    const [MyDetails, setMyDetails] = useState<UserFormData>(); //  אם אנחנו בשלב הזנת קוד
    const userDetails = useUserStore((state) => state.user);

    useEffect(() => {
        console.log("Updated userDetails:", userDetails);
    }, [userDetails]);

    const isReady = useUserStore((state) => state.isReady);

    if (!isReady) {
        // return <p>Loading...</p>;
    }
    return (
        <div dir="ltr">
            {userDetails ? (
               <ShowUserPersonalDetails user={userDetails}></ShowUserPersonalDetails>
            ) : (
                <p>No user data found</p>

            )}
        </div>

    )
}
export default Home;
