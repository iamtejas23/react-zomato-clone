import React from 'react';
import './SkeletonLoader.css';

export const SkeletonCard = () => (
  <div className="skeleton-card" aria-hidden="true">
    <div className="skeleton skeleton--image" />
    <div className="skeleton-card__body">
      <div className="skeleton-card__header">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--badge" />
      </div>
      <div className="skeleton skeleton--text" />
      <div className="skeleton skeleton--text-short" />
    </div>
  </div>
);

export const SkeletonText = ({ width = '100%', height = '1rem', radius = 'var(--radius-sm)' }) => (
  <div className="skeleton" style={{ width, height, borderRadius: radius }} aria-hidden="true" />
);

export default SkeletonCard;
