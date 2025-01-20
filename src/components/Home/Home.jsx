import React from 'react';
import Navbar from '../Navbar/Navbar'; // Import Navbar component
import './Home.css'; // Import CSS for styling
import SearchBar from '../SearchBar/SearchBar';

const Hero = () => {
  return (
    <div className="hero">
      <Navbar /> {/* Include Navbar here */}
      <div className="hero-content">
        <h1>Fomato V1</h1>
        <p>Discover the best food & drinks near you</p>
        <SearchBar />
      </div>
    </div>
  );
}

export default Hero;
