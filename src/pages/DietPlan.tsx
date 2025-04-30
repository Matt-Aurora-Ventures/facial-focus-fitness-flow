
import React from 'react';
import Header from '../components/Header';
import DietPlanGenerator from '../components/DietPlanGenerator';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const DietPlanPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <DietPlanGenerator />
      <Footer />
      <Navigation />
    </div>
  );
};

export default DietPlanPage;
