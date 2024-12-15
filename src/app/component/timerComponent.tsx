
"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // for client-side navigation
import { useSession } from "next-auth/react"; // for authentication state
import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "@/app/store/modelStore";

const TimerComponent = () => {
    const { data: session, status } = useSession(); // Get session and status
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter(); // Use router for navigation


    const openModal = useCallback(() => {
        useModalStore.setState({ isModalOpen: true });
    }, []);
    
    const closeModal = useCallback(() => {
        useModalStore.setState({ isModalOpen: false });
    }, []);

    useEffect(() => {
        setIsClient(true);
    
        // Redirect if user is authenticated
        if (status === "authenticated") {
            if (isModalOpen) closeModal(); // Only close if modal is open
            router.push("/pages/user-account"); // Redirect once
            return; // Exit effect after redirect
        }
    
        // Handle modal visibility based on cookie
        const userNameFromCookie = decodeURIComponent(document.cookie);
        if (!userNameFromCookie && !isModalOpen) {
            openModal(); // Open modal only if not already open
        }
    
        const intervalId = setInterval(() => {
            const userNameFromCookie = decodeURIComponent(document.cookie);
            if (!userNameFromCookie) {
                openModal(); // Re-open modal if user is logged out
            }
        }, 120000); // 2 minutes
    
        return () => clearInterval(intervalId); // Cleanup interval
    }, [status, isModalOpen, openModal, closeModal, router]);
    
    if (!isClient) {
        return null; // Render nothing until client-side rendering
    }

    return (
        <div>
            <PopUpWindow>
                <Login />
            </PopUpWindow>
        </div>
    );
};

export default TimerComponent;
