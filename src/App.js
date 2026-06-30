import React from 'react';
import { AppProvider } from './context/AppContext';
import Home from './components/Home/Home';
import Stepcard from './components/Stepcard/Stepcard';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import RestaurantSection from './components/RestaurantSection/RestaurantSection';
import Collections from './components/Collections/Collections';
import Localities from './components/Localities/Localities';
import Download from './components/Download/Download';
import Footer from './components/Footer/Footer';
import Lower from './components/Lower/Lower';
import TrendingKolhapur from './components/TrendingKolhapur/TrendingKolhapur';
import Toast from './components/ui/Toast/Toast';
import './App.css';

const App = () => (
  <AppProvider>
    <div className="app">
      <main>
        <Home />
        <Stepcard />
        <TrendingKolhapur />
        <CategoryFilter />
        <RestaurantSection />
        <Collections />
        <Localities />
        <Download />
      </main>
      <Footer />
      <Lower />
      <Toast />
    </div>
  </AppProvider>
);

export default App;
