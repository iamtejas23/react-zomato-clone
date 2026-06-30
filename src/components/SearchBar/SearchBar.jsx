import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { searchSuggestions } from '../../data/mockData';
import './SearchBar.css';

const SearchBar = () => {
  const { setSearchQuery, addToast } = useApp();
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const suggestions = value.length > 0
    ? searchSuggestions.filter(s => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
    : searchSuggestions.slice(0, 6);

  const handleSearch = (term) => {
    const q = term ?? value;
    if (!q.trim()) return;
    setValue(q);
    setSearchQuery(q);
    setFocused(false);
    addToast(`Searching for "${q}"…`, 'info');
  };

  const handleClear = () => {
    setValue('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDropdown = focused && (suggestions.length > 0);

  return (
    <div className="searchbar" ref={wrapRef} role="search">
      <div className={`searchbar__box${focused ? ' searchbar__box--focused' : ''}`}>
        <FiSearch className="searchbar__prefix-icon" aria-hidden="true" />
        <input
          ref={inputRef}
          className="searchbar__input"
          type="search"
          placeholder="Search for restaurant, cuisine or a dish…"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
          aria-label="Search restaurants, cuisines and dishes"
          aria-autocomplete="list"
        />
        {value && (
          <button className="searchbar__clear" onClick={handleClear} aria-label="Clear search">
            <FiX size={15} />
          </button>
        )}
        <button className="searchbar__cta" onClick={() => handleSearch()} aria-label="Search">
          <FiSearch size={16} className="searchbar__cta-icon" aria-hidden="true" />
          <span className="searchbar__cta-text">Search</span>
        </button>
      </div>

      {showDropdown && (
        <div className="searchbar__dropdown" role="listbox" aria-label="Search suggestions">
          {value.length === 0 && (
            <p className="searchbar__dropdown-label">Popular Searches</p>
          )}
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="searchbar__item"
              role="option"
              aria-selected="false"
              onMouseDown={(e) => { e.preventDefault(); handleSearch(s); }}
            >
              <FiSearch size={13} className="searchbar__item-icon" aria-hidden="true" />
              <span>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
