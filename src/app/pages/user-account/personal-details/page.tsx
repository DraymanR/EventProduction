'use client'

// import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import { getMyDetails } from "@/app/services/user/getDetails";
import useUserStore from "@/app/store/userModel";
// import useMyUser from "@/app/store/users";
import { UserFormData } from "@/app/types/user";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [MyDetails, setMyDetails] = useState<UserFormData>(); //  אם אנחנו בשלב הזנת קוד
    // const userDetails = useUserStore((state) => state.user);
    // const uuser = useUserStore((state) => state.user);

    const userDetails = useUserStore((state) => state.user);
    useEffect(() => {
        console.log("Updated userDetails:", userDetails);
    }, [userDetails]);
    // console.log("userDetails", userDetails);

    const isReady = useUserStore((state) => state.isReady);

    if (!isReady) {
        return <p>Loading...</p>;
    }
    return (
        <div dir="ltr">
            {/* {userDetails ? (
                // {MyDetails ? (
                // <ShowUserPersonalDetails User={userDetails} ></ShowUserPersonalDetails>
            ) : ( */}
                <p>No user data found</p>

            {/* )} */}
        </div>

    )
}
export default Home;
