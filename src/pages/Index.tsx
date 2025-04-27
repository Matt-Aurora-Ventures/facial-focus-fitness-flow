
import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';
import ActivityBanner from '../components/ActivityBanner';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ActivityBanner />
      <Dashboard />
      <Footer />
      <Navigation />
    </div>
  );
};

export default Index;
