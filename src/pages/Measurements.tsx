
import React from 'react';
import Header from '../components/Header';
import PhotoTracking from '../components/PhotoTracking';
import Navigation from '../components/Navigation';

const MeasurementsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PhotoTracking />
      <Navigation />
    </div>
  );
};

export default MeasurementsPage;
