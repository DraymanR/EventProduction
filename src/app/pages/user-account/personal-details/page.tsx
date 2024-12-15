'use client'

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import { getMyDetails } from "@/app/services/user/getDetails";
import { UserFormData } from "@/app/types/user";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; 

const Home: React.FC = () => {
    console.log("inside the personal details page")
    const [MyDetails, setMyDetails] = useState<UserFormData>();
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession(); // Get session information

    const convertToUserFormData = (data: any): UserFormData => {
        return {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            userName: data.userName || "",
            email: data.email || "",
            password: "", 
            title: data.title || "consumer", 
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
                setIsLoading(true);
                const personalDetails = await getMyDetails();
                const userData = convertToUserFormData(personalDetails.user);
                console.log('Converted User Data:', userData);
                
                setMyDetails(userData);
            } catch (error) {
                console.error('Error fetching personal details:', error);
                // Optionally handle error state
            } finally {
                setIsLoading(false);
            }
        }
  
        // Only try to fetch details if there's an active session or cookie
        if (session || document.cookie.includes('username=')) {
            getMyPersonalDetails();
        } else {
            setIsLoading(false);
        }
    }, [session]); // Add session as a dependency

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div dir="ltr">
            {MyDetails ? (
                <ShowUserPersonalDetails userData={MyDetails} />
            ) : (
                <p>No user details found</p>
            )}
        </div>
    )
}

export default Home;
