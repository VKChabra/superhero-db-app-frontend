import { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import API, { baseURL } from "../services/api";
import styles from "./SuperheroDetails.module.css";
import { useParams } from "react-router-dom";
import ImageManager from "./ImageUpdateManager";
import notifications from "../helpers/notifications";
import closeIcon from "../images/close-icon.png";

const SuperheroDetails = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    API.get(`/superheroes/${id}`).then(response => {
      setSuperhero(response.data);
      setEditedData(response.data);
    });
  }, [id]);

  const handleInputChange = (name, e) => {
    setEditedData(prevState => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleImagesUpload = images => {
    const updatedData = {
      ...editedData,
      images: [...editedData.images, ...images],
    };

    setEditedData(updatedData);
  };

  const handleRemoveImage = (event, index) => {
    event.preventDefault();
    const updatedImages = editedData.images.filter((_, i) => i !== index);
    setEditedData({
      ...superhero,
      images: updatedImages,
    });
  };

  const handleSaveChanges = async () => {
    if (editedData.images.length > 5) {
      return notifications.notifyError("No more than 5 images");
    }

    const formData = new FormData();
    for (const key in editedData) {
      if (editedData.hasOwnProperty(key) && key !== "_id" && key !== "__v") {
        if (Array.isArray(editedData[key])) {
          editedData[key].forEach(item => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, editedData[key]);
        }
      }
    }

    try {
      await API.put(`/superheroes/${id}`, formData);
      setSuperhero(editedData);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating superhero data: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setEditedData(superhero);
  };

  if (!superhero) {
    return <div>Loading...</div>;
  }

  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    superhero;

  if (
    nickname.trim() === "" ||
    real_name.trim() === "" ||
    origin_description.trim() === "" ||
    superpowers.length === 0 ||
    catch_phrase.trim() === ""
  ) {
    notifications.notifyWarning("Make sure each field is not empty");
    return;
  }

  const [mainImageEditable, ...additionalImagesEditable] = editedData.images;

  return (
    <div className={styles.detailsContainer}>
      <h2>Superhero Details</h2>
      <div className={styles.imageContainer}>
        {mainImageEditable && typeof mainImageEditable === "string" ? (
          <img
            src={baseURL + mainImageEditable}
            alt={`${nickname} - img 0`}
            className={styles.detailsImage}
          />
        ) : (
          mainImageEditable && (
            <img
              src={URL.createObjectURL(mainImageEditable)}
              alt={`${nickname} - img 0`}
              className={styles.detailsImage}
            />
          )
        )}
        {isEditable && mainImageEditable && (
          <button
            className={styles.removeButton}
            type="text"
            onClick={event => handleRemoveImage(event, 0)}
          >
            <img src={closeIcon} alt="Remove" />
          </button>
        )}
      </div>
      <div>
        <div className={styles.content}>
          <span>Nickname: </span>
          <ContentEditable
            html={editedData.nickname}
            disabled={!isEditable}
            onChange={e => handleInputChange("nickname", e)}
          />
        </div>
        <div className={styles.content}>
          <span>Real Name: </span>
          <ContentEditable
            html={editedData.real_name}
            disabled={!isEditable}
            onChange={e => handleInputChange("real_name", e)}
          />
        </div>
        <div className={styles.content}>
          <span>Origin Description: </span>
          <ContentEditable
            html={editedData.origin_description}
            disabled={!isEditable}
            onChange={e => handleInputChange("origin_description", e)}
          />
        </div>
        <div className={styles.content}>
          <span>Superpowers: </span>
          <ContentEditable
            html={
              Array.isArray(editedData.superpowers)
                ? editedData.superpowers.join(", ")
                : editedData.superpowers
            }
            disabled={!isEditable}
            onChange={e => handleInputChange("superpowers", e)}
          />
        </div>
        <div className={styles.content}>
          <span>Catch Phrase: </span>
          <ContentEditable
            html={editedData.catch_phrase}
            disabled={!isEditable}
            onChange={e => handleInputChange("catch_phrase", e)}
          />
        </div>
      </div>
      <div className={styles.additionalImagesContainer}>
        {additionalImagesEditable.map((image, index) => (
          <div className={styles.imageContainer} key={index}>
            {image && typeof image === "string" ? (
              <img
                src={baseURL + image}
                alt={`${nickname} - img ${index + 1}`}
                className={styles.additionalImage}
              />
            ) : (
              image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt={`${nickname} - img ${index + 1}`}
                  className={styles.additionalImage}
                />
              )
            )}
            {isEditable && image && (
              <button
                className={styles.removeButton}
                type="text"
                onClick={event => handleRemoveImage(event, index + 1)}
              >
                <img src={closeIcon} alt="Remove" />
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditable && (
        <ImageManager
          onImagesUpdate={handleImagesUpload}
          existingImages={editedData.images}
        />
      )}
      {isEditable ? (
        <>
          <button onClick={() => handleSaveChanges()}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsEditable(true)}>Edit</button>
      )}
    </div>
  );
};

export default SuperheroDetails;
