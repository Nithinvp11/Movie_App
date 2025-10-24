import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route 1: The Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Route 2: The Movie Detail Page */}
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;