import { addImageToPost } from '@/app/services/post/post';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState } from 'react';

interface ImageGalleryProps {
  postUsername:string;
   postId:string;
  images: string[];

}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images,postId ,postUsername}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false); // מצב אם להציג את כל התמונות או לא
  const userNameFromCookie = decodeURIComponent(document.cookie);
  console.log(userNameFromCookie);
  const userName = userNameFromCookie&&userNameFromCookie.split('; ').find(cookie => cookie.startsWith('userName=')).split('=')[1]||"";
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setIsImageSelected(true);
  };
  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      const secureUrl = result.info.secure_url;
      addImageToPost(postId, secureUrl); // שומר את הקישור המלא במערך
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsImageSelected(false);
  };

  const nextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    } else {
      setSelectedImageIndex(0);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else {
      setSelectedImageIndex(images.length - 1);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // משנה את המצב של ההתרחבות
  };

  // הצגת רק 2 תמונות אם לא מורחב
  const displayedImages = isExpanded ? images : images.slice(0, 2);

  return (
    <div className="image-gallery mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">תמונות:</h2>
      <div className="flex gap-6 flex-wrap justify-start">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="w-28 h-28 bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(index)}
          >
            <img
              src={image}
              alt={`image-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* כפתור להתרחבות */}
      {images.length > 2 && !isExpanded && (
        <button
          onClick={toggleExpand}
          className="mt-4 text-blue-600 font-semibold"
        >
          הצג עוד
        </button>
      )}

      {isExpanded && images.length > 2 && (
        <button
          onClick={toggleExpand}
          className="mt-4 text-blue-600 font-semibold"
        >
          הסתר
        </button>
      )}
      {(postUsername == userName) && <CldUploadWidget
        uploadPreset="appOrganizerEvent"
        onSuccess={handleUploadSuccess}
        options={{
          sources: [
            'local',
            'camera',
            'google_drive',
            'url'
          ],
          maxFiles: 35,
        }}
      >
        {({ open }) => (
          <button
            onClick={() => open()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            +
          </button>
        )}
      </CldUploadWidget>}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg max-w-4xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black p-3 rounded-full"
            >
              X
            </button>

            <div className="flex justify-between items-center">
              <button
                onClick={prevImage}
                className="text-white bg-black p-3 rounded-full"
              >
                ←
              </button>

              <img
                src={images[selectedImageIndex]}
                alt="Selected"
                className="max-w-full max-h-96 object-contain rounded-md shadow-lg"
              />

              <button
                onClick={nextImage}
                className="text-white bg-black p-3 rounded-full"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
