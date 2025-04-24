
import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Dashboard />
      <Navigation />
    </div>
  );
};

export default Index;
