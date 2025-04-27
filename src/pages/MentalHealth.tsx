
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MentalHealthCheck from '@/components/MentalHealthCheck';
import ActivityBanner from '@/components/ActivityBanner';
import Footer from '@/components/Footer';

const MentalHealthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ActivityBanner />
      <MentalHealthCheck />
      <Footer />
      <Navigation />
    </div>
  );
};

export default MentalHealthPage;
