import { useState, useEffect } from "react";
import API from "../services/api";
import styles from "./SuperheroDetails.module.css";

const SuperheroDetails = ({ match }) => {
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    API.get(`/superheroes/${match.params.id}`).then(response => {
      setSuperhero(response.data);
    });
  }, [match.params.id]);

  if (!superhero) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h2>Superhero Details</h2>
      <img
        src={superhero.images[0]}
        alt={superhero.nickname}
        className={styles.detailsImage}
      />
      <p>Nickname: {superhero.nickname}</p>
      {/* Display other superhero details as needed */}
    </div>
  );
};

export default SuperheroDetails;
