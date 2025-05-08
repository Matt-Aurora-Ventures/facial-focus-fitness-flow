
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import MentalHealthCheck from '@/components/MentalHealthCheck';
import Footer from '@/components/Footer';

const MentalHealthPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MentalHealthCheck />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default MentalHealthPage;
