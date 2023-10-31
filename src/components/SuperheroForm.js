import { useState } from "react";
import API from "../services/api";
import styles from "./SuperheroForm.module.css";
import notifications from "../helpers/notifications";
import ImageManager from "./ImageFormManager";
import { useNavigate } from "react-router-dom";

const SuperheroForm = () => {
  const navigate = useNavigate();
  const [superheroData, setSuperheroData] = useState({
    nickname: "",
    real_name: "",
    origin_description: "",
    superpowers: [],
    catch_phrase: "",
    images: [],
  });
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    superheroData;

  const handleImagesUpdate = images => {
    setSuperheroData({
      ...superheroData,
      images: images,
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

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

    if (superheroData.images.length === 0) {
      notifications.notifyWarning("Please upload at least one image.");
      return;
    }
    let updatedSHData = {
      ...superheroData,
      superpowers: superpowers.split(",").map(power => power.trim()),
    };
    const formData = new FormData();
    for (const key in updatedSHData) {
      if (updatedSHData.hasOwnProperty(key)) {
        if (Array.isArray(updatedSHData[key])) {
          updatedSHData[key].forEach(item => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, updatedSHData[key]);
        }
      }
    }

    API.post("/superheroes", formData)
      .then(response => {
        notifications.notifySuccess(
          "Superhero created successfully:",
          response.data
        );
        setSuperheroData({
          nickname: "",
          real_name: "",
          origin_description: "",
          superpowers: [],
          catch_phrase: "",
          images: [],
        });
        navigate(`/superhero/${response.data._id}`);
      })
      .catch(error => {
        notifications.notifyError("Error creating superhero");
        console.error(error);
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
        <ImageManager onImagesUpdate={handleImagesUpdate} />
        <br />
        <button type="submit" className={styles.formButton}>
          Create
        </button>
      </form>
    </div>
  );
};

export default SuperheroForm;
