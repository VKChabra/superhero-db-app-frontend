import { useState, useEffect } from "react";
import API, { baseURL } from "../services/api";
import styles from "./SuperheroList.module.css";
import Pagination from "./Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuperheroList = () => {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const [superheroes, setSuperheroes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 5;

  const onPageChange = newPage => {
    setCurrentPage(newPage);
    navigate(`/superheroes?page=${newPage}`);
    API.get(`/superheroes?page=${newPage}`)
      .then(response => {
        setSuperheroes(response.data.superheroes);
        setTotalItems(response.data.totalItems);
      })
      .catch(error => {
        console.error("Error fetching superheroes data: ", error);
      });
  };

  const handleViewDetails = superheroId => {
    navigate(`/superhero/${superheroId}`);
  };

  useEffect(() => {
    API.get(`/superheroes?page=${currentPage}`)
      .then(response => {
        setSuperheroes(response.data.superheroes);
        setTotalItems(response.data.totalItems);
      })
      .catch(error => {
        console.error("Error fetching superheroes data: ", error);
      });
  }, [currentPage]);

  return (
    <div>
      <h2>Superheroes List</h2>
      {superheroes.map(hero => (
        <div key={hero._id} className={styles.listItem}>
          <img src={baseURL + hero.images[0]} alt={hero.nickname} />
          <p>Nickname: {hero.nickname}</p>
          <button onClick={() => handleViewDetails(hero._id)}>
            View Details
          </button>
        </div>
      ))}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default SuperheroList;
