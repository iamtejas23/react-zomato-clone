import React from 'react';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { localities } from '../../data/mockData';
import './Localities.css';

const Localities = () => {
  const { addToast } = useApp();

  return (
    <section className="localities section" aria-label="Popular localities">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              Popular localities in <span className="localities__city">Kolhapur</span>
            </h2>
            <p className="section-subtitle">Browse restaurants by neighbourhood</p>
          </div>
          <button className="section-link" onClick={() => addToast('All localities coming soon!', 'info')}>
            View all <FiArrowRight size={15} />
          </button>
        </div>

        <div className="localities__grid">
          {localities.map((loc, i) => (
            <button
              key={i}
              className="loc-card"
              style={{ animationDelay: `${i * 40}ms` }}
              onClick={() => addToast(`Exploring ${loc.name}…`, 'info')}
              aria-label={`${loc.name} — ${loc.count} restaurants`}
            >
              <div className="loc-card__icon" aria-hidden="true">
                <FiMapPin size={16} />
              </div>
              <div className="loc-card__text">
                <span className="loc-card__name">{loc.name}</span>
                <span className="loc-card__count">{loc.count} places</span>
              </div>
              <FiArrowRight size={16} className="loc-card__arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Localities;
