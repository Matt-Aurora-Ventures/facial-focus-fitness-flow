
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MentalHealthCheck from '@/components/MentalHealthCheck';
import ActivityBanner from '@/components/ActivityBanner';

const MentalHealthPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-24">
      <Header />
      <ActivityBanner />
      <MentalHealthCheck />
      <Navigation />
    </div>
  );
};

export default MentalHealthPage;
