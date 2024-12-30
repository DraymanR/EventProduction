import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    setIsImageSelected(true);
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

  return (
    <div className="image-gallery mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">תמונות:</h2>
      <div className="flex gap-6 flex-wrap justify-start">
        {images.map((image, index) => (
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
