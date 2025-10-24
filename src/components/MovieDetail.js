import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../MovieDetail.css';


const MovieDetail = () => {
  const { id } = useParams(); // This 'id' is now the 'imdbID'
  
  // 1. PASTE YOUR OMDb API KEY HERE
 const API_KEY = process.env.REACT_APP_OMDB_API_KEY; // Replace with your actual OMDb API key
  
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      // 2. UPDATED: The OMDb URL for a single movie uses 'i='
      const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`;
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMovie(data); 
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchMovie();
  }, [id, API_KEY]); // Re-run if the 'id' (in the URL) changes

  if (!movie) {
    return <div>Loading...</div>;
  }

  // 3. UPDATED: Render all the new OMDb properties
  return (
    <div className="movie-detail-container">
      <img 
        src={movie.Poster} 
        alt={movie.Title} 
      />
      <div className="movie-detail-info">
        <h1>{movie.Title}</h1>
        <p>{movie.Plot}</p>
        <p><strong>Rating:</strong> {movie.imdbRating} / 10</p>
        <p><strong>Released:</strong> {movie.Released}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
      </div>
    </div>
  );
};

export default MovieDetail;