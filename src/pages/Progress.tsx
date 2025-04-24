
import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ProgressAnalysis from '../components/ProgressAnalysis';

const Progress: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressAnalysis />
      <Navigation />
    </div>
  );
};

export default Progress;
