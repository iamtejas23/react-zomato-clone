import React, { useMemo } from 'react';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { restaurants } from '../../data/mockData';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import { SkeletonCard } from '../ui/SkeletonLoader/SkeletonLoader';
import './RestaurantSection.css';

const SKELETONS = Array.from({ length: 8 });

const RestaurantSection = () => {
  const { activeCategory, searchQuery, isLoading, addToast } = useApp();

  const filtered = useMemo(() => {
    let list = restaurants;
    if (activeCategory !== 'all') {
      list = list.filter(r => r.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const title = searchQuery
    ? `Results for "${searchQuery}"`
    : activeCategory !== 'all'
    ? `${activeCategory.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Restaurants`
    : 'Popular Near You';

  return (
    <section className="rs section" aria-label="Restaurant listings">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{title}</h2>
            {!isLoading && (
              <p className="section-subtitle">
                {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} available
              </p>
            )}
          </div>
          <button
            className="section-link"
            onClick={() => addToast('Full restaurant listing coming soon!', 'info')}
            aria-label="See all restaurants"
          >
            See all <FiArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        {isLoading ? (
          <div className="rs__grid">
            {SKELETONS.map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rs__empty">
            <span className="rs__empty-icon" aria-hidden="true">🍽️</span>
            <h3 className="rs__empty-title">No restaurants found</h3>
            <p className="rs__empty-text">
              Try a different search term or browse all categories
            </p>
            <button
              className="rs__empty-btn"
              onClick={() => addToast('Showing all restaurants', 'info')}
            >
              <FiSearch size={15} aria-hidden="true" />
              Browse All
            </button>
          </div>
        ) : (
          <div className="rs__grid">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantSection;
