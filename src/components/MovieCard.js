import React from 'react';
import { Link } from 'react-router-dom'; 
import '../MovieCard.css'; 

const MovieCard = ({ movie }) => {
  // 1. We no longer need IMAGE_BASE_URL
  // OMDb gives a full URL in 'movie.Poster'

  return (
    // 2. UPDATED: Link to the 'imdbID'
    <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
      <div className="movie-card">
        {/* 3. UPDATED: Use 'movie.Poster' for the image */}
        {movie.Poster !== 'N/A' ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
          />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
        
        {/* 4. UPDATED: Use 'movie.Title' */}
        <h3>{movie.Title}</h3>

        {/* 5. UPDATED: Use 'movie.Year' */}
        <p>Year: {movie.Year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;