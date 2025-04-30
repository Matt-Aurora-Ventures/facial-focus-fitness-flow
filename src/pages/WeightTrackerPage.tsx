
import React from 'react';
import Header from '../components/Header';
import WeightTracker from '../components/WeightTracker';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WeightTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6">Weight Tracker</h2>
        <WeightTracker />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default WeightTrackerPage;
