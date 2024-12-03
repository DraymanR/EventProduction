'use client'

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import { getMyDetails } from "@/app/services/user/registerUser";
import useMyUser from "@/app/store/users";
import { UserFormData } from "@/app/types/user";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    const [MyDetails, setMyDetails] = useState<UserFormData>(); //  אם אנחנו בשלב הזנת קוד

    const convertToUserFormData = (data: any): UserFormData => {
        return {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            userName: data.userName || "",
            email: data.email || "",
            password: "", // שדה סיסמה כנראה לא יגיע מהשרת
            title: data.title || "consumer", // ערך ברירת מחדל אם אין
            phone: data.phone || "",
            description: data.description || "",
            language: data.language || "Hebrew",
            address: {
                zipCode: data.zipCode || "",
                city: data.city || "",
                street: data.street || "",
                building: data.building || 0,
            },
            supplierDetails: data.supplierDetails
                ? {
                    startingPrice: data.supplierDetails.startingPrice || 0,
                    topPrice: data.supplierDetails.topPrice || 0,
                    eventList: data.supplierDetails.eventList || [],
                    recommendation: data.supplierDetails.recommendation || [],
                    range: data.supplierDetails.range || 0,
                    emptyDate: data.supplierDetails.emptyDate || [],
                    images: data.supplierDetails.images || [],
                    description: data.supplierDetails.description || "",
                }
                : undefined,
        };
    };

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            try {
                const personalDetails = await getMyDetails();
                const userData = convertToUserFormData(personalDetails.user);
                console.log(userData);
                
                setMyDetails(userData); // מעדכן את המצב
                console.log(MyDetails, "llllll")
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [])

    return (
        <div dir="ltr">
            {MyDetails ? (
                <ShowUserPersonalDetails userData={MyDetails} />
            ) : (
                <p>Loading...</p> // הודעת טעינה אם הנתונים אינם מוכנים
            )}
        </div>

    )
}
export default Home;
