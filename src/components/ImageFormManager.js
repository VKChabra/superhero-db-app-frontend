import { useRef, useState } from "react";
import styles from "./ImageFormManager.module.css";
import closeIcon from "../images/close-icon.png";

const ImageManager = ({ onImagesUpdate }) => {
  const [images, setImages] = useState([]);
  // console.log("image manager: ", images);
  const fileInputRef = useRef(null);

  const handleImages = files => {
    let newImages = [];
    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      newImages.push(imageFile);
    }
    setImages(prevImages => [...prevImages, ...newImages]);
    onImagesUpdate([...images, ...newImages]);
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

  const handleRemoveImage = (event, index) => {
    event.preventDefault();
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesUpdate(updatedImages);
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
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Superhero ${index}`}
              className={styles.image}
            />
            <button
              className={styles.removeButton}
              type="text"
              onClick={event => handleRemoveImage(event, index)}
            >
              <img src={closeIcon} alt="Remove" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageManager;
