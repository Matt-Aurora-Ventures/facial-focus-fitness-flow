
import React from 'react';
import Header from '../components/Header';
import RunningTrailsComponent from '../components/RunningTrails';
import Navigation from '../components/Navigation';

const RunningTrailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RunningTrailsComponent />
      <Navigation />
    </div>
  );
};

export default RunningTrailsPage;
