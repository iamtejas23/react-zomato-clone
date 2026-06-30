import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMdRestaurant } from 'react-icons/io';
import { useApp } from '../../context/AppContext';
import india from '../../assets/india.png';
import glob from '../../assets/globe.svg';
import './Footer.css';

const FOOTER_LINKS = [
  {
    heading: 'About Fomato',
    links: ['Blog', 'Who We Are', 'Work With Us', 'Investor Relations', 'Press Kit', 'Contact Us'],
  },
  {
    heading: 'Partners',
    links: ['Fomato', 'Blinkit', 'Feeding India', 'Hyperpure', 'Fomaland'],
  },
  {
    heading: 'For Restaurants',
    links: ['Partner With Us', 'Apps For You', 'Business Blog', 'Merchant Support'],
  },
  {
    heading: 'Learn More',
    links: ['Privacy Policy', 'Security', 'Terms & Conditions', 'Sitemap'],
  },
  {
    heading: 'Social',
    links: ['LinkedIn', 'Instagram', 'Twitter / X', 'YouTube', 'Facebook'],
  },
];

const Footer = () => {
  const { addToast } = useApp();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Top bar */}
        <div className="footer__top">
          <div className="footer__brand">
            <IoMdRestaurant className="footer__brand-icon" aria-hidden="true" />
            <span className="footer__brand-text">Fomato</span>
          </div>
          <div className="footer__locale">
            <button
              className="footer__locale-btn"
              onClick={() => addToast('Language/region selector coming soon!', 'info')}
              aria-label="Change country: India"
            >
              <img src={india} alt="" className="footer__locale-flag" />
              India
              <IoIosArrowDown size={14} aria-hidden="true" />
            </button>
            <button
              className="footer__locale-btn"
              onClick={() => addToast('Language selector coming soon!', 'info')}
              aria-label="Change language: English"
            >
              <img src={glob} alt="" className="footer__locale-flag footer__locale-flag--globe" />
              English
              <IoIosArrowDown size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="footer__divider" aria-hidden="true" />

        {/* Links grid */}
        <nav className="footer__grid" aria-label="Footer navigation">
          {FOOTER_LINKS.map(col => (
            <div key={col.heading} className="footer__col">
              <h3 className="footer__col-heading">{col.heading}</h3>
              <ul className="footer__list">
                {col.links.map(link => (
                  <li key={link}>
                    <button
                      className="footer__link"
                      onClick={() => addToast(`${link} coming soon!`, 'info')}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
