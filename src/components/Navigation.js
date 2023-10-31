import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css"; // Import module CSS

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/superheroes" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create" className={styles.link}>
            Create Superhero
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
