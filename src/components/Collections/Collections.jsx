import React from 'react';
import './Collections.css';
import { MdOutlineArrowRight } from "react-icons/md";
import col1 from '../../assets/col1.jpg';
import col2 from '../../assets/col2.jpg';
import col3 from '../../assets/col3.jpg';
import col4 from '../../assets/col4.jpg';

const Collections = () => {
  return (
    <div className='Collections-app'>
        <h2>Collections</h2>
        <div className="clacol">
        <p>Explore curated lists of top restaurants, cafes, pubs, and bars in Mumbai, based on trends</p> <p className='mum'>All collections in Mumbai <MdOutlineArrowRight size={24} /> </p> 
        
        </div>
        <div className="image-grid">
      <div className="image-container">
        <div className="image-item">
          <img src={col1} alt="col" />
          <div className="image-text">Cricket at food court</div>
        </div>
        <div className="image-item">
          <img src={col2} alt="col" />
          <div className="image-text">We are open</div>
        </div>
        <div className="image-item">
          <img src={col3} alt="col" />
          <div className="image-text">Amazing breakfast</div>
        </div>
        <div className="image-item">
          <img src={col4} alt="col" />
          <div className="image-text">Varoius beverages</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Collections;