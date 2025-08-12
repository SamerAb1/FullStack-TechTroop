import React from 'react';
import './CategoryList.css';

const CategoryCard = ({ categoryData }) => {
  const { name, description, imageUrl } = categoryData;
  return (
    <div className="card category-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default CategoryCard;
