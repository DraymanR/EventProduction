import React from "react";
import useModalStore from "@/app/store/modelPop-upWindow";

const PopUpWindow = ({ children }: { children: React.ReactNode }) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
       <div className="overflow-y-auto bg-white p-6 rounded-lg shadow-lg w-[90vh]">{/* w-full"> */}
        <button
          className="text-red-500 hover:text-gray-800"
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
