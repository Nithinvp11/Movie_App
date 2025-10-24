import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; 
import '../App.css'; 

function Home() { 
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // This useEffect runs once on load to get default movies
  useEffect(() => {
    const DEFAULT_MOVIES_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`;
    fetchMovies(DEFAULT_MOVIES_URL);
  }, [API_KEY]); // Dependency array is important!

  const fetchMovies = async (url) => {
    // We log the URL first, so we always see it
    console.log("Fetching URL:", url);

    try {
      const response = await fetch(url);
      const data = await response.json();

      // --- FIX #1 ---
      // OMDb uses 'data.Search', not 'data.results'.
      // If it finds movies, 'data.Search' will be an array.
      if (data.Search) {
        setMovies(data.Search);
      } else {
        // If it finds no movies, 'data.Search' is undefined.
        // We MUST clear the old movies.
        setMovies([]); 
      }
    } catch (error) {
      // --- FIX #2 (THIS IS THE FIX FOR YOUR BUG) ---
      // If the fetch fails (NetworkError, etc.), we MUST clear the old movies.
      // Without this line, the old "batman" list will stay on the screen.
      console.error("Error fetching data: ", error);
      setMovies([]); // Clear movies on any error
    }
  };

  const handleSearch = (event) => {
    event.preventDefault(); 
    if (searchTerm) {
      // --- ADD THIS LINE ---
      setMovies([]); // Clear the old movies immediately
      
      const SEARCH_API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;
      fetchMovies(SEARCH_API_URL);
      setSearchTerm(''); 
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Movie App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <div className="movie-container">
        {/* This guard checks if movies is an array before mapping */}
        {movies && movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;