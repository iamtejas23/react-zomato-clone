import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiHeart, FiMenu, FiX, FiChevronDown, FiMapPin } from 'react-icons/fi';
import { IoMdRestaurant } from 'react-icons/io';
import { useApp } from '../../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme, favorites, addToast } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const notifyComingSoon = (label) => {
    addToast(`${label} coming soon! 🚀`, 'info');
    setMobileOpen(false);
  };

  return (
    <nav
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--open' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        <a href="/" className="navbar__brand" aria-label="Fomato home">
          <IoMdRestaurant className="navbar__brand-icon" aria-hidden="true" />
          <span className="navbar__brand-text">Fomato</span>
        </a>

        {scrolled && (
          <button
            className="navbar__location"
            onClick={() => addToast('Serving across Kolhapur! 📍', 'info')}
            aria-label="Change location"
          >
            <FiMapPin size={14} aria-hidden="true" />
            <span>Kolhapur</span>
            <FiChevronDown size={13} aria-hidden="true" />
          </button>
        )}

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          <button
            className="navbar__icon-btn"
            onClick={() => addToast(
              favorites.length
                ? `You have ${favorites.length} saved restaurant${favorites.length > 1 ? 's' : ''} ❤️`
                : 'Tap ❤️ on any restaurant to save it',
              'info'
            )}
            aria-label={`Favorites — ${favorites.length} saved`}
          >
            <FiHeart size={18} />
            {favorites.length > 0 && (
              <span className="navbar__badge" aria-live="polite">{favorites.length}</span>
            )}
          </button>

          <div className="navbar__auth-desktop">
            <button className="navbar__btn navbar__btn--ghost" onClick={() => notifyComingSoon('Login')}>
              Log in
            </button>
            <button className="navbar__btn navbar__btn--primary" onClick={() => notifyComingSoon('Sign up')}>
              Sign up
            </button>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        <button className="navbar__btn navbar__btn--ghost navbar__mobile-btn" onClick={() => notifyComingSoon('Login')}>
          Log in
        </button>
        <button className="navbar__btn navbar__btn--primary navbar__mobile-btn" onClick={() => notifyComingSoon('Sign up')}>
          Sign up
        </button>
        <hr className="navbar__divider" />
        <button className="navbar__mobile-link" onClick={() => notifyComingSoon('Get the app')}>Get the App</button>
        <button className="navbar__mobile-link" onClick={() => notifyComingSoon('Add restaurant')}>Add Restaurant</button>
      </div>
    </nav>
  );
};

export default Navbar;
