
import React from 'react';
import Header from '../components/Header';
import WaterGoalTracker from '../components/WaterGoalTracker';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const WaterGoalsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6">Water Goals</h2>
        <WaterGoalTracker />
      </div>
      <Footer />
      <Navigation />
    </div>
  );
};

export default WaterGoalsPage;
