import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; // Import your CSS file

const SearchBar = ({ onSearch }) => {
  const handleChange = event => {
    const query = event.target.value;
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for restaurant, cuisine or a dish"
        onChange={handleChange}
      />
      <button type="submit" onClick={() => onSearch('')}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
