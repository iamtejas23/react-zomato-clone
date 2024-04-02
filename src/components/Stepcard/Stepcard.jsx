import React from 'react';
import './Stepcard.css';
import c1 from '../../assets/c1.avif';
import c2 from '../../assets/c2.avif';
import c3 from '../../assets/c3.avif';

const MenuCard = ({ image, title, description, price }) => {
  return (
    <div className="menu-card">
      <img src={image} alt={title} />
      <div className="menu-card-info">
        <h3>{title}</h3>
        <p>{description}</p>
        
      </div>
    </div>
  );
};

const ZomatoOrderOnline = () => {
  const menuItems = [
    {
      image: c1,
      title: 'Order Online',
      description: 'Stay home and order to your doorstep',
      price: 10.99,
    },
    {
        image: c2,
        title: 'Dining',
        description: 'View the city\'s favourite dining venues',
        price: 12.99,
    },
    {
      image: c3,
      title: 'Nightlife and Clubs',
      description: 'Explore the city’s top nightlife outlets',
      price: 15.99,
    },
  ];

  return (
    <div className="order-online">
      
      
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            
          />
        ))}
      </div>
    </div>
  );
};

export default ZomatoOrderOnline;
