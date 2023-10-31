import { useRef, useState } from "react";
import styles from "./ImageUpdateManager.module.css";

const ImageManager = ({ onImagesUpdate }) => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImages = files => {
    let newImages = [];
    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      newImages.push(imageFile);
    }
    setImages([...newImages]);
    onImagesUpdate([...newImages]);
  };

  const handleDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length > 0 && images.length < 5) {
      handleImages(files);
    }
  };

  const handleFileInputChange = event => {
    const files = event.target.files;

    if (images.length < 5) {
      handleImages(files);
    }
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  return (
    <div
      className={styles.dropArea}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className={styles.uploadLabel} htmlFor="fileInput">
        Click or drag images here to upload (up to 5)
      </label>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className={styles.fileInput}
        multiple
      />
    </div>
  );
};

export default ImageManager;
