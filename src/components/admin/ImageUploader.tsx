'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUpload: (imagePath: string) => void;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  currentImage = '/placeholder-person.svg', 
  onImageUpload,
  label = 'Last opp bilde (400x400 px)'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Filen må være et bilde');
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Upload the file
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Feil ved opplasting');
      }

      // Update the image path
      onImageUpload(data.filePath);
      setPreviewImage(data.filePath);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Feil ved opplasting');
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploaderContainer}>
      <div className={styles.imagePreviewContainer}>
        <Image
          src={previewImage}
          alt="Forhåndsvisning"
          width={150}
          height={150}
          className={styles.imagePreview}
        />
      </div>
      
      <div className={styles.uploadControls}>
        <p className={styles.uploadLabel}>{label}</p>
        <p className={styles.uploadInstructions}>
          For best resultat, bruk bilder i størrelse 400x400 piksler. 
          Kvadratiske bilder vil vises best på nettsiden.
        </p>
        <button 
          type="button" 
          onClick={handleButtonClick}
          className={styles.uploadButton}
          disabled={isUploading}
        >
          {isUploading ? 'Laster opp...' : 'Velg bilde'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploader;
