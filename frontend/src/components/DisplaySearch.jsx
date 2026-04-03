import React from "react";
import MovieCard from "./Card";
import "./DisplaySearch.css";
import { useNavigate } from 'react-router-dom';

function DisplaySearch({ movies }) {
  const navigate = useNavigate();

  // Show loading if there are no movies to display
  if (movies.length === 0) {
    return <div className="empty"> <p>Your Result is not matching any.</p></div >;
  }

  return (
    <div className="displaySearch d-flex flex-wrap justify-content-start">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          url={movie.poster_url || movie.poster_original_url || 'https://via.placeholder.com/300'}
          title={movie.title}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />
      ))}
    </div>
  );
}

export default DisplaySearch;
