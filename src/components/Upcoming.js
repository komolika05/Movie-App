import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://moviesdatabase.p.rapidapi.com/titles/x/upcoming", {
        params: { info: "image" },
        headers: {
          "X-RapidAPI-Key":
            "b58a47d3f4mshfdf1856d723ba59p1a921djsn855b86cde7a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Upcoming Movies</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`}>
            <div className="movie-card" key={movie.id}>
              <img
                src={movie.primaryImage?.url}
                alt={movie.primaryImage?.caption?.plainText}
              />
              <h2>{movie.primaryImage?.caption?.plainText}</h2>
              <p>{movie.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
