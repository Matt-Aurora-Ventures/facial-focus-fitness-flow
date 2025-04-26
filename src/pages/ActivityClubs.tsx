
import React from 'react';
import Header from '../components/Header';
import ActivityClubFinder from '../components/ActivityClubFinder';
import Navigation from '../components/Navigation';

const ActivityClubsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActivityClubFinder />
      <Navigation />
    </div>
  );
};

export default ActivityClubsPage;
