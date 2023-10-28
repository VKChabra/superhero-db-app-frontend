import { useState, useEffect } from "react";
import API from "../services/api";
import styles from "./SuperheroList.module.css";

const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    API.get("/superheroes").then(response => {
      setSuperheroes(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Superheroes List</h2>
      {superheroes.map(hero => (
        <div key={hero._id} className={styles.listItem}>
          <img src={hero.images[0]} alt={hero.nickname} />
          <p>Nickname: {hero.nickname}</p>
        </div>
      ))}
    </div>
  );
};

export default SuperheroList;
