import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SearchBar from '../SearchBar/SearchBar';
import { heroStats } from '../../data/mockData';
import './Home.css';

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero__overlay" aria-hidden="true" />
      <Navbar />

      <div className={`hero__body${visible ? ' hero__body--visible' : ''}`}>
        <div className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          Delivering happiness across Kolhapur
        </div>

        <h1 className="hero__title">
          Discover the{' '}
          <span className="hero__title-accent">best food</span>
          <br />
          &amp; drinks near you
        </h1>

        <p className="hero__subtitle">
          Order from 200+ restaurants in Kolhapur with lightning-fast delivery right to your door
        </p>

        <div className="hero__search-wrap">
          <SearchBar />
        </div>

        <div className="hero__stats" aria-label="Platform statistics">
          {heroStats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="var(--bg)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
