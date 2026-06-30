import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import c1 from '../../assets/c1.avif';
import c2 from '../../assets/c2.avif';
import c3 from '../../assets/c3.avif';
import './Stepcard.css';

const SERVICES = [
  {
    image: c1,
    label: 'Order Online',
    title: 'Order Online',
    description: 'Stay home and order to your doorstep',
    tag: 'Available now',
    tagColor: 'green',
  },
  {
    image: c2,
    label: 'Dining',
    title: 'Dining',
    description: "View the city's favourite dining venues",
    tag: '500+ venues',
    tagColor: 'orange',
  },
  {
    image: c3,
    label: 'Nightlife and Clubs',
    title: 'Nightlife & Clubs',
    description: "Explore the city's top nightlife outlets",
    tag: 'Open late',
    tagColor: 'purple',
  },
];

const ServiceCard = ({ service, onSelect }) => (
  <article className="sc" onClick={() => onSelect(service.title)} role="button" tabIndex={0}
    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(service.title)}
    aria-label={service.title}
  >
    <div className="sc__img-wrap">
      <img src={service.image} alt="" className="sc__img" loading="lazy" role="presentation" />
      <div className="sc__overlay" aria-hidden="true" />
      <span className={`sc__tag sc__tag--${service.tagColor}`}>{service.tag}</span>
    </div>
    <div className="sc__body">
      <div className="sc__text">
        <h3 className="sc__title">{service.title}</h3>
        <p className="sc__desc">{service.description}</p>
      </div>
      <span className="sc__arrow" aria-hidden="true">
        <FiArrowRight size={18} />
      </span>
    </div>
  </article>
);

const Stepcard = () => {
  const { addToast } = useApp();

  const handleSelect = (title) => {
    addToast(`Exploring ${title}…`, 'info');
  };

  return (
    <section className="services section" aria-label="Our services">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">What would you like to do?</h2>
            <p className="section-subtitle">Choose how you want to experience great food today</p>
          </div>
        </div>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} service={s} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stepcard;
