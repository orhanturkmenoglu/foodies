import React, { useRef } from 'react';
import { categories } from '../../assets/assets';
import "../ExploreMenu/ExploreMenu.css";

const ExploreMenu = () => {
  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <div className="explore-menu position-relative">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="menu-title">🍽️ Explore Our Menu</h2>
        <div className="d-flex gap-2">
          <i className="bi bi-arrow-left-circle-fill scroll-icon" onClick={scrollLeft}></i>
          <i className="bi bi-arrow-right-circle-fill scroll-icon" onClick={scrollRight}></i>
        </div>
      </div>

      <p className="menu-subtitle">
        Discover curated dishes from our top categories
      </p>

      <div 
        className="d-flex gap-4 overflow-auto explore-menu-list pb-2" 
        ref={menuRef}
      >
        {categories.map((item, index) => (
          <div key={index} className="text-center explore-menu-list-item">
            <img 
              src={item.icon} 
              className="rounded-circle menu-item-img" 
              alt={item.category}
              width={72}
              height={72}
            />
            <p className="mt-2 fw-semibold">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
