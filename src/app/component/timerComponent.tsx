"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // for client-side navigation
import { useSession } from "next-auth/react"; // for authentication state
import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "../store/modelStore";

const TimerComponent = () => {
    const { data: session, status } = useSession(); // Get session and status
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const router = useRouter(); // Use router for navigation

    useEffect(() => {
        // Redirect if user is authenticated
        if (status === "authenticated") {
            if (isModalOpen) closeModal(); // Close modal if open
            router.push("/pages/user-account"); // Redirect to user account
            return; // Exit effect after redirect
        }

        // Handle modal visibility based on cookie
        const userNameFromCookie = decodeURIComponent(document.cookie || "");
        if (!userNameFromCookie && !isModalOpen) {
            openModal(); // Open modal if user is not logged in
        }

        const intervalId = setInterval(() => {
            const userNameFromCookie = decodeURIComponent(document.cookie || "");
            if (!userNameFromCookie) {
                openModal(); // Re-open modal if user is logged out
            }
        }, 120000); // 2 minutes

        return () => clearInterval(intervalId); // Cleanup interval
    }, [status, router]);

    if (!isModalOpen) return null;

    return (
        <div>
            <PopUpWindow>
                <Login />
            </PopUpWindow>
        </div>
    );
};

export default TimerComponent;
