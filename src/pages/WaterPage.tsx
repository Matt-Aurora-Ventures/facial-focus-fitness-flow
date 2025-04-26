
import React from 'react';
import Header from '../components/Header';
import WaterTracking from '../components/WaterTracking';
import Navigation from '../components/Navigation';

const WaterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WaterTracking />
      <Navigation />
    </div>
  );
};

export default WaterPage;
