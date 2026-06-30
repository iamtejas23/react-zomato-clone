import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { collections } from '../../data/mockData';
import col1 from '../../assets/col1.jpg';
import col2 from '../../assets/col2.jpg';
import col3 from '../../assets/col3.jpg';
import col4 from '../../assets/col4.jpg';
import './Collections.css';

const localImages = [col1, col2, col3, col4];

const CollectionCard = ({ item, localImage, onClick }) => (
  <article className="coll-card" onClick={onClick} role="button" tabIndex={0}
    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    aria-label={item.name}
  >
    <div className="coll-card__img-wrap">
      <img
        src={localImage || item.image}
        alt=""
        className="coll-card__img"
        loading="lazy"
        role="presentation"
      />
      <div className="coll-card__overlay" aria-hidden="true" />
    </div>
    <div className="coll-card__body">
      <h3 className="coll-card__title">{item.name}</h3>
      <p className="coll-card__desc">{item.description}</p>
      <span className="coll-card__count">{item.count} places</span>
    </div>
  </article>
);

const Collections = () => {
  const { addToast } = useApp();

  return (
    <section className="collections section" aria-label="Curated collections">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Collections</h2>
            <p className="section-subtitle">
              Curated lists of the best restaurants, cafes &amp; bars in Kolhapur
            </p>
          </div>
          <button className="section-link" onClick={() => addToast('All collections coming soon!', 'info')}>
            All collections <FiArrowRight size={15} />
          </button>
        </div>

        <div className="collections__grid">
          {collections.map((item, i) => (
            <CollectionCard
              key={item.id}
              item={item}
              localImage={localImages[i]}
              onClick={() => addToast(`Exploring "${item.name}"…`, 'info')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
