import React from 'react';
import './Lower.css';

const Lower = () => (
  <div className="lower">
    <div className="lower__inner">
      <p className="lower__text">
        Built with ❤️ by <strong>Tejas Mane</strong> — Portfolio Project
      </p>
      <p className="lower__copy">
        © {new Date().getFullYear()} Fomato™. All trademarks are properties of their respective owners.
      </p>
    </div>
  </div>
);

export default Lower;
