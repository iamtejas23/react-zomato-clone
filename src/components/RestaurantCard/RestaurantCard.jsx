import React from 'react';
import { FiHeart, FiStar, FiClock } from 'react-icons/fi';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { useApp } from '../../context/AppContext';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant, index = 0 }) => {
  const { favorites, toggleFavorite, addToast } = useApp();
  const isFav = favorites.includes(restaurant.id);

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(restaurant.id);
    addToast(
      isFav ? 'Removed from favorites' : `${restaurant.name} saved! ❤️`,
      isFav ? 'info' : 'success'
    );
  };

  const handleClick = () => {
    addToast(`Opening ${restaurant.name}…`, 'info');
  };

  return (
    <article
      className="rc"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={handleClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      role="button"
      tabIndex={0}
      aria-label={`${restaurant.name} — ${restaurant.cuisine}`}
    >
      {/* Image */}
      <div className="rc__img-wrap">
        <img
          src={restaurant.image}
          alt=""
          className="rc__img"
          loading="lazy"
          role="presentation"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80`;
          }}
        />
        <div className="rc__img-overlay" aria-hidden="true" />

        {/* Badges */}
        {(restaurant.isNew || restaurant.isTrending) && (
          <div className="rc__badges" aria-hidden="true">
            {restaurant.isNew && <span className="rc__badge rc__badge--new">New</span>}
            {restaurant.isTrending && <span className="rc__badge rc__badge--trending">🔥 Trending</span>}
          </div>
        )}

        {/* Favorite */}
        <button
          className={`rc__fav${isFav ? ' rc__fav--on' : ''}`}
          onClick={handleFav}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFav}
        >
          <FiHeart size={16} />
        </button>

        {/* Offer strip */}
        {restaurant.offer && (
          <div className="rc__offer" aria-label={`Offer: ${restaurant.offer}`}>
            <MdOutlineDeliveryDining size={14} aria-hidden="true" />
            <span>{restaurant.offer}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="rc__body">
        <div className="rc__row">
          <h3 className="rc__name">{restaurant.name}</h3>
          <div
            className={`rc__rating${restaurant.rating >= 4.5 ? ' rc__rating--high' : ''}`}
            aria-label={`Rating: ${restaurant.rating} out of 5`}
          >
            <FiStar size={11} aria-hidden="true" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <p className="rc__cuisine">{restaurant.cuisine}</p>

        <div className="rc__meta">
          <span className="rc__delivery">
            <FiClock size={12} aria-hidden="true" />
            {restaurant.deliveryTime} min
          </span>
          <span className="rc__sep" aria-hidden="true">·</span>
          <span>₹{restaurant.priceForTwo} for two</span>
          {restaurant.isVeg && (
            <>
              <span className="rc__sep" aria-hidden="true">·</span>
              <span className="rc__veg" aria-label="Pure vegetarian">
                <span className="rc__veg-dot" aria-hidden="true" />
                Veg
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default RestaurantCard;
