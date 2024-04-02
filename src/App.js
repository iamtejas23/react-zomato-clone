import React from 'react'
import Home from './components/Home/Home';
import Stepcard from './components/Stepcard/Stepcard';
import Collections from './components/Collections/Collections';
import Localities from './components/Localities/Localities';
import Download from './components/Download/Download';
import Footer from './components/Footer/Footer';
import Lower from './components/Lower/Lower';


const App = () => {
  return (
    <div>
      
      <Home />
      <Stepcard/>
      <Collections />
      <Localities />
      <Download />
      <Footer />
      <Lower />
    </div>
  )
}

export default App;