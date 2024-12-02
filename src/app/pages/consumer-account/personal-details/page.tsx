'use client'

import { getMyDetails } from "@/app/services/user/registerUser";
import useMyUser from "@/app/store/users";
import { useEffect } from "react";

const Home = () => {

    const myUserName = useMyUser((state) => state.userName);
    // const setMyUserName = useMyUser((state) => state.setUserName);

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            try {
                const personalDetails = await getMyDetails(myUserName)
                console.log(personalDetails)
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [myUserName])

    return (
        <div>
            <div>Consumer account- personal-details</div>
            {/* { personalDetails.map()} */}
        </div>
    )
}
export default Home;
