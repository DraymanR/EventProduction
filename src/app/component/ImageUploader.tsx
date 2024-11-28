"use client" 
import React from "react";
import { CldUploadWidget } from 'next-cloudinary';

const newPost = () => {

    return (

        <CldUploadWidget uploadPreset="appOrganizerEvent">
            {({ open }) => {
                return (
                    <button onClick={() => open()}>
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>

    )
}

export default newPost