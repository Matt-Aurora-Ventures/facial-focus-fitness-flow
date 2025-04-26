
import React from 'react';
import Header from '../components/Header';
import GymFinderComponent from '../components/GymFinder';
import Navigation from '../components/Navigation';

const GymFinderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GymFinderComponent />
      <Navigation />
    </div>
  );
};

export default GymFinderPage;
