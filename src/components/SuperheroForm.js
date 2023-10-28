import { useState } from "react";
import API from "../services/api";
import styles from "./SuperheroForm.module.css";
import SuperheroImages from "./ImagePreview";

const SuperheroForm = () => {
  const [superheroData, setSuperheroData] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [],
    catch_phrase: "",
    images: [],
  });

  const handleImageUpload = image => {
    if (superheroData.images.length >= 5) {
      console.error("Maximum allowed images per superhero is 5.");
      return;
    }

    if (!image) {
      console.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    API.post("/superheroes/upload", formData)
      .then(response => {
        const newImageLink = response.data;
        setSuperheroData({
          ...superheroData,
          images: [...superheroData.images, newImageLink],
        });
        console.log(superheroData);
      })
      .catch(error => {
        console.error("Error uploading image:", error);
      });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const superpowersArray = superheroData.superpowers.split(", ");
    let updatedSuperheroData = {
      ...superheroData,
      superpowers: superpowersArray,
    };

    if (updatedSuperheroData.images.length === 0) {
      console.error("Please upload at least one image.");
      return;
    }

    API.post("/superheroes", updatedSuperheroData)
      .then(response => {
        console.log("Superhero created successfully:", response.data);
        setSuperheroData({
          nickname: "",
          real_name: "",
          origin_description: "",
          superpowers: [],
          catch_phrase: "",
          images: [],
        });
        updatedSuperheroData = {};
      })
      .catch(error => {
        console.error("Error creating superhero:", error);
      });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSuperheroData({
      ...superheroData,
      [name]: value,
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create Superhero</h2>
      <form onSubmit={handleFormSubmit}>
        <label className={styles.formLabel}>
          Nickname:
          <input
            type="text"
            name="nickname"
            value={superheroData.nickname}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Real Name:
          <input
            type="text"
            name="real_name"
            value={superheroData.real_name}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Origin Description:
          <textarea
            name="origin_description"
            value={superheroData.origin_description}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Superpowers (comma-separated):
          <input
            type="text"
            name="superpowers"
            value={superheroData.superpowers}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </label>
        <br />
        <label className={styles.formLabel}>
          Catch Phrase:
          <input
            type="text"
            name="catch_phrase"
            value={superheroData.catch_phrase}
            onChange={handleInputChange}
            className={styles.formInput}
          />
        </label>
        <SuperheroImages images={superheroData.images} />
        <br />
        <input
          type="file"
          onChange={e => handleImageUpload(e.target.files[0])}
        />
        <br />
        <button type="submit" className={styles.formButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default SuperheroForm;
