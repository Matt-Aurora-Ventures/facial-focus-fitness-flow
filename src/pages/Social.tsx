
import React from 'react';
import Header from '../components/Header';
import SocialComponent from '../components/Social';
import Navigation from '../components/Navigation';

const SocialPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SocialComponent />
      <Navigation />
    </div>
  );
};

export default SocialPage;
