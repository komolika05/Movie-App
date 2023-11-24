import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Movie() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://moviesdatabase.p.rapidapi.com/titles/${movieId}`, {
        headers: {
          "X-RapidAPI-Key":
            "b58a47d3f4mshfdf1856d723ba59p1a921djsn855b86cde7a1",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      })
      .then((response) => {
        setMovieData(response.data.results);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [movieId]);

  if (!movieData) {
    return <div>Can't find !!!</div>;
  }

  return (
    <>
      {movieData && (
        <div>
          <h2>{movieData.titleText?.text}</h2>
          {movieData.primaryImage && (
            <img
              src={movieData.primaryImage.url}
              alt={movieData.titleText?.text}
              style={{ height: "200px" }}
            />
          )}
          <p>
            Release Date: {movieData.releaseDate?.day}/
            {movieData.releaseDate?.month}/{movieData.releaseDate?.year}
          </p>
          <p>Release Year: {movieData.releaseYear?.year}</p>
          <p>Title Type: {movieData.titleType?.text}</p>
          <p>ID: {movieData.id}</p>
          <p>_id: {movieData._id}</p>
        </div>
      )}
    </>
  );
}

export default Movie;
