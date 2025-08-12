import React from 'react';
import CategoryList from './Categories/CategoryList';
import HogwartsLogo from './Header/HogwartsLogo';
import './Home.css';

const Home = ({ categories }) => {
  return (
    <div className="home">
      <HogwartsLogo />
      <CategoryList categories={categories} />
    </div>
  );
}

export default Home;
