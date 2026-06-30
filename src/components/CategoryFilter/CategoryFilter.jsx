import React, { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { categories } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import './CategoryFilter.css';

const CategoryFilter = () => {
  const { activeCategory, setActiveCategory } = useApp();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  };

  return (
    <div className="cat-filter" aria-label="Category filter">
      <button className="cat-filter__arrow cat-filter__arrow--left" onClick={() => scroll(-1)} aria-label="Scroll left">
        <FiChevronLeft size={18} />
      </button>

      <div className="cat-filter__track" ref={scrollRef} role="list">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-filter__chip${activeCategory === cat.id ? ' cat-filter__chip--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            aria-pressed={activeCategory === cat.id}
          >
            <span className="cat-filter__emoji" aria-hidden="true">{cat.emoji}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <button className="cat-filter__arrow cat-filter__arrow--right" onClick={() => scroll(1)} aria-label="Scroll right">
        <FiChevronRight size={18} />
      </button>
    </div>
  );
};

export default CategoryFilter;
