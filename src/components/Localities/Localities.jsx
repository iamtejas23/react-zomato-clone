import React from 'react';
import './Localities.css';
import { MdOutlineArrowRight } from 'react-icons/md';
// import { MdOutlineArrowDropDown } from 'react-icons/md';


const locations = [
    { name: 'Lower Parel', count: 455 },
    { name: 'Powai', count: 416 },
    { name: 'Malad West', count: 884 },
    { name: 'Borivali West', count: 644 },
    { name: 'Bandra Kurla Complex', count: 142 },
    { name: 'Vashi', count: 628 },
    { name: 'Fort', count: 266 },
    { name: 'Juhu', count: 234 },
    { name: 'see more'  }
  ];

const Localities = () => {
  return (
    <><div className='localities-con'>
          <h2>Popular localities in and around <span>Mumbai</span></h2>
      </div><div className="container-local">
              {locations.map((location, index) => (
                  <div className="card-local" key={index}>
                      <div>
                      <h2>{location.name}</h2>
                      <p>{location.count} places</p> 
                      </div>
                      <div>
                      <MdOutlineArrowRight size={24} />
                      </div>
                  </div>
              ))}
              
          </div></>

  )
}

export default Localities;