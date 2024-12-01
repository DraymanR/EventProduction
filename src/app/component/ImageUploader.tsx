"use client"

import React from "react";
import { CldUploadWidget } from 'next-cloudinary';
import saveImageUrlToDatabase from "@/app/services/saveImageUrlToDatabase "

const newPost = () => {

    const handleUploadSuccess = async (result: any) => {
        if (result.info && result.info.secure_url) {
          const imageUrl = result.info.secure_url;
          await saveImageUrlToDatabase(imageUrl);
        }
      };

    return (

        <CldUploadWidget 
            uploadPreset="appOrganizerEvent"
            onSuccess={handleUploadSuccess}
            >
            
            {({ open }) => {
                return (
                    <button
                        onClick={() => open()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>

    )
}

export default newPost

