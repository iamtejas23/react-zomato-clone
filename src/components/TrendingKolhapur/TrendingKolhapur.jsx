import React from 'react';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { trendingInKolhapur } from '../../data/mockData';
import './TrendingKolhapur.css';

const TrendingKolhapur = () => {
  const { addToast } = useApp();

  return (
    <section className="trk section" aria-label="Trending in Kolhapur">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="trk__eyebrow">
              <FiTrendingUp size={14} aria-hidden="true" />
              What's Hot Right Now
            </div>
            <h2 className="section-title">
              Trending in <span className="trk__city">Kolhapur</span>
            </h2>
            <p className="section-subtitle">
              Kolhapur's most-ordered dishes &amp; flavours today
            </p>
          </div>
          <button
            className="section-link"
            onClick={() => addToast('Full trending list coming soon!', 'info')}
          >
            View all <FiArrowRight size={15} />
          </button>
        </div>

        <div className="trk__grid">
          {trendingInKolhapur.map((item, i) => (
            <button
              key={item.id}
              className="trk__card"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => addToast(`Searching for ${item.name}…`, 'info')}
              aria-label={item.name}
            >
              <div className="trk__card-left">
                <div
                  className="trk__emoji-wrap"
                  style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}30` }}
                  aria-hidden="true"
                >
                  <span className="trk__emoji">{item.emoji}</span>
                </div>
                <div className="trk__info">
                  <span className="trk__name">{item.name}</span>
                  <span className="trk__desc">{item.desc}</span>
                </div>
              </div>
              <div className="trk__card-right">
                <div className="trk__count-wrap">
                  <span className="trk__count" style={{ color: item.color }}>
                    {item.count}
                  </span>
                  <span className="trk__count-sub">today</span>
                </div>
                <FiArrowRight size={15} className="trk__arrow" aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingKolhapur;
