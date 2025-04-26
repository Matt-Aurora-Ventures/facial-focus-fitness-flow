
import React from 'react';
import Header from '../components/Header';
import WorkoutMarketplace from '../components/WorkoutMarketplace';
import Navigation from '../components/Navigation';

const WorkoutMarketplacePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkoutMarketplace />
      <Navigation />
    </div>
  );
};

export default WorkoutMarketplacePage;
