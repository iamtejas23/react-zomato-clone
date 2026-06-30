import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('fomato-theme') || 'light');
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fomato-favorites') || '[]'); }
    catch { return []; }
  });
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fomato-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('fomato-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      favorites, toggleFavorite,
      toasts, addToast, removeToast,
      searchQuery, setSearchQuery,
      activeCategory, setActiveCategory,
      isLoading,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
