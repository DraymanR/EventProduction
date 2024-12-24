'use client';

import React from "react";
import useModalStore from "@/app/store/modelStore";

const PopUpWindow = ({ children }: { children: React.ReactNode }) => {
const isModalOpen = useModalStore((state) => state.isModalOpen);

  const closeModal = useModalStore((state) => state.closeModal);

  console.log("isModalOpen:", isModalOpen);  // הוסף כאן את ההדפסה כדי לבדוק את ה-state

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-[90vh]"
        style={{ marginTop: "300px" }} // מרחק מלמעלה כדי למנוע חפיפה עם ה-Navbar
      >
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-gray-800"
          onClick={closeModal}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUpWindow;
